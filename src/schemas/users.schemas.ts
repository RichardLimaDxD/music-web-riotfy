import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .email({ message: "Digite um email valido!" })
    .nonempty({ message: "Esse campo não pode estar vazio!" }),
  password: z
    .string()
    .min(8, { message: "Esse campo deve conter 8 caractéres!" })
    .nonempty({ message: "Esse campo não pode estar vazio!" }),
  name: z
    .string()
    .min(2, { message: "Esse campo deve conter 2 caractéres!" })
    .nonempty({ message: "Esse campo não pode estar vazio!" }),
  admin: z.boolean().optional().default(false),
});

const requestUserSchema = userSchema.omit({ id: true });

const retrieveUserSchema = userSchema.omit({ password: true });

const patchUserSchema = retrieveUserSchema.omit({ id: true });

export { userSchema, requestUserSchema, retrieveUserSchema, patchUserSchema };
