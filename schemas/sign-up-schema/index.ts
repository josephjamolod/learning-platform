import { z } from "zod";

export const signUpSchema = z.object({
  firstname: z.string().min(8, { message: "Please enter a valid name" }),
  lastname: z.string().min(8, { message: "Please enter a valid name" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, { message: "Your password cannot be longer than 64 characters" })
    .refine(
      (data) => /^[a-zA-z0-9_.-]*$/.test(data ?? ""),
      "password should containe only alphabets and numbers"
    ),
});
