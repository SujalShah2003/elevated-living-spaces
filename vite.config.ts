import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import contactHandler from "./api/contact";

type DevApiResponse = {
  status: (statusCode: number) => DevApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

function contactApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: "contact-api-dev",
    apply: "serve",
    configureServer(server) {
      for (const key of ["RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"]) {
        if (env[key]) process.env[key] = env[key];
      }

      server.middlewares.use("/api/contact", async (request, response) => {
        let rawBody = "";
        for await (const chunk of request) rawBody += chunk;

        let body: unknown;
        try {
          body = rawBody ? JSON.parse(rawBody) : undefined;
        } catch {
          response.statusCode = 400;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ message: "Invalid JSON request." }));
          return;
        }

        const apiResponse: DevApiResponse = {
          status(statusCode) {
            response.statusCode = statusCode;
            return apiResponse;
          },
          setHeader(name, value) {
            response.setHeader(name, value);
          },
          json(payload) {
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify(payload));
          },
        };

        try {
          await contactHandler({ method: request.method, body }, apiResponse);
        } catch (error) {
          console.error("Contact API development error:", error);
          if (!response.headersSent) response.statusCode = 500;
          if (!response.writableEnded) {
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify({ message: "Unable to process the contact request." }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: { tsconfigPaths: true },
    plugins: [contactApiDevPlugin(env), react(), tailwindcss(), tsconfigPaths()],
  };
});
