import * as z from "zod";

export const MessageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "message must have at least 10 characters" })
    .max(300, { message: "message can not have more than 300 characters" }),
});
