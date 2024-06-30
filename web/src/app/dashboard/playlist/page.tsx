"use client";
import Header from "@/components/Header";
import { Player } from "@/components/Player";
import Image from "next/image";
import leagueOfLegends from "../../../assets/logo.svg";
import { SkipsNextAndPrevSection } from "@/components/SkipsNextAndPrevSection";
import styles from "./styles.module.scss";

const Playlist = () => {
  return (
    <>
      <Header />
      <section className={styles.container__sectionPlaylist}>
        <Image src={leagueOfLegends} alt="league of legends" />
        <h2>RIOT GAMES</h2>

        <SkipsNextAndPrevSection />
      </section>
      <Player />
    </>
  );
};

export default Playlist;
