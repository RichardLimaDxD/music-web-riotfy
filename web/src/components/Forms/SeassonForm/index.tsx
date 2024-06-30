"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Iseasson } from "@/interfaces/users.interface";
import { VscArrowRight } from "react-icons/vsc";
import { useUsers } from "@/hooks/users.hook";
import logo from "../../../../public/logo.png";
import facebookIcon from "../../../../public/facebook-icon.png";
import googleIcon from "../../../../public/google-icon.png";
import appleIcon from "../../../../public/apple-icon.png";
import Link from "next/link";
import styles from "./styles.module.scss";

const SeassonForm = () => {
  const { register, handleSubmit } = useForm<Iseasson>();
  const { seasson } = useUsers();

  const submit = (formData: Iseasson) => {
    seasson(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={styles.container__seassonForm}
    >
      <Image src={logo} alt="logo riot games" />

      <h2>Fazer login</h2>

      <input type="text" placeholder="Nome de usuário" {...register("email")} />
      <input type="password" placeholder="Senha" {...register("password")} />

      <div className={styles.container__seassonDiv}>
        <div className={styles.container__divFacebook}>
          <Image src={facebookIcon} alt="facebook" />
        </div>

        <div className={styles.container__divGoogle}>
          <Image src={googleIcon} alt="google" />
        </div>

        <div className={styles.container__divApple}>
          <Image src={appleIcon} alt="apple" />
        </div>
      </div>

      <div className={styles.container__divCheckBox}>
        <input type="checkbox" id="checkboxSeasson" />
        <label htmlFor="checkboxSeasson">Manter login</label>
      </div>

      <button type="submit">
        <VscArrowRight />
      </button>

      <div className={styles.container__divRegisterAccount}>
        <h3>Não consegue iniciar sessão?</h3>
        <Link href={"register"}>CRIAR CONTA</Link>
      </div>
    </form>
  );
};

export { SeassonForm };
