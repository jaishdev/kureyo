import * as z from "zod";

export const UserValidation = z
    .string()
    .min(2, {message : "Username must be of atleast 2 characters"})
    .max(20, {message:"Username can not be more than 2 characters"})
    .regex(/^[a-zA-Z0-9_]+$/, {message:"username must not include special characters"});

export const signUpSchema = z.object({
    username: UserValidation,
    email: z.string().email({message:"Please enter a valid email address"}),
    password : z.string().min(6 , {message: "Password must be of atleast 6 characters."})

})