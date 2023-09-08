"use client";
import { SignUpForm } from "@/components/Forms/SignUpForm";
import Image from "next/image";
import backgroundImgRegister from "/public/sett.jpg";
import styles from "./styles.module.scss";

const register = () => {
  return (
    <main className={styles.container__registerMain}>
      <section>
        <SignUpForm />
        <Image src={backgroundImgRegister} alt="img background" />
      </section>
    </main>
  );
};

export default register;
