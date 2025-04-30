import z from "zod";

export const createSigninSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required field" })
    .email({ message: "please enter a valid email" }),
  password: z.string().min(1, { message: "Email is required field!" }).max(8, {
    message: "password should not contain more than 8 characters",
  }),
});
