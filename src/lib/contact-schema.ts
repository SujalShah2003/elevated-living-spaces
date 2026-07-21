import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(254),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a preferred date")
    .refine(
      (value) => new Date(`${value}T23:59:59`).getTime() >= Date.now(),
      "Choose today or a future date",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a brief message")
    .max(2_000, "Please keep your message under 2,000 characters"),
  // Filled only by bots. It is intentionally hidden from real visitors.
  company: z.string().max(200),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
