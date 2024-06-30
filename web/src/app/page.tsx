"use client";
import { SeassonForm } from "@/components/Forms/SeassonForm";
import backgroundImg from "/public/riven.jpg";
import Image from "next/image";
import styles from "./styles.module.scss";

const Seasson = () => {
  return (
    <main className={styles.container__seassonMain}>
      <section>
        <SeassonForm />
        <Image src={backgroundImg} alt="morgana background" />
      </section>
    </main>
  );
};

export default Seasson;
