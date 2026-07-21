import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { POST as contactHandler } from "./api/contact";

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

        if (request.method !== "POST") {
          response.statusCode = 405;
          response.setHeader("Allow", "POST");
          response.end();
          return;
        }

        try {
          const result = await contactHandler(
            new Request("http://localhost/api/contact", {
              method: "POST",
              headers: { "Content-Type": request.headers["content-type"] ?? "application/json" },
              body: rawBody,
            }),
          );
          response.statusCode = result.status;
          result.headers.forEach((value, name) => response.setHeader(name, value));
          response.end(await result.text());
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
