import z from "zod";

export const createSignupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(1, { message: "Email is required field!" })
      .max(8, {
        message: "password should not contain more than 8 characters",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
