import { z } from "zod";

export const userSigninValidator = z.object({
  email: z.string().email(),
  name: z.string().min(2, "A name should be of atleast length 2"),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .max(32, "The password must be a maximun 32 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
      "The password should contain atleas one uppercase letter and one special character eg:- @,#,$,%,etc"
    ),
});

export const userLoginValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .max(32, "The password must be a maximun 32 characters"),
});

export const formattedErrorsMessage = (zodError: any) =>
  zodError.error.issues
    .map((issue: any) => {
      const field = issue.path[0]; // Extract the field name from 'path'
      return `${field.charAt(0).toUpperCase() + field.slice(1)}: ${
        issue.message
      }`;
    })
    .join(", "); // Join the messages into a single string separated by commas
