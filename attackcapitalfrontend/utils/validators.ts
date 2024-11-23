import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type authType = z.infer<typeof authSchema>;

export const postSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type postType = z.infer<typeof postSchema>;
