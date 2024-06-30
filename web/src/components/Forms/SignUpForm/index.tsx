"use client";
import { Iusers } from "@/interfaces/users.interface";
import { requestUserSchema } from "@/schemas/users.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUsers } from "@/hooks/users.hook";
import Link from "next/link";
import styles from "./styles.module.scss";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iusers>({
    resolver: zodResolver(requestUserSchema),
  });

  const { createUser } = useUsers();

  const submit = (formData: Iusers) => {
    createUser(formData);
  };

  return (
    <form
      className={styles.container__registerForm}
      onSubmit={handleSubmit(submit)}
    >
      <h1>Criar usuário</h1>

      <input
        type="email"
        placeholder="Digite seu e-mail..."
        {...register("email")}
      />
      {errors.email?.message && <p> * {errors.email?.message}</p>}

      <input
        type="password"
        placeholder="Crie uma senha..."
        {...register("password")}
      />
      {errors.password?.message && <p> * {errors.password?.message}</p>}

      <input
        type="text"
        placeholder="Digite seu nome..."
        {...register("name")}
      />
      {errors.name?.message && <p> * {errors.name?.message}</p>}

      <button type="submit">Criar Conta</button>

      <Link href={"/"}>Já possui uma conta</Link>
    </form>
  );
};

export { SignUpForm };
