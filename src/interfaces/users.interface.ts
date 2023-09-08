import { requestUserSchema } from "@/schemas/users.schemas";
import { z } from "zod";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface IpropsDefault {
  children: ReactNode;
}

interface IpropsUser {
  user: Iusers | null;
  setUser: Dispatch<SetStateAction<Iusers | null>>;
  createUser: (formData: Iusers) => Promise<void>;
  seasson: (formData: Iseasson) => Promise<void>;
  retrieveUser: () => Promise<void>;
  logOut: () => void;
  openNav: boolean;
  setIsOpenNav: Dispatch<SetStateAction<boolean>>;
}

interface Iusers {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  admin?: boolean;
}

interface Iseasson {
  email: string;
  password: string;
}

type TuserSchema = z.infer<typeof requestUserSchema>;

export type { IpropsDefault, IpropsUser, Iusers, Iseasson, TuserSchema };
