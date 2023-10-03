import api from "@/services/api";
import Header from "@/components/Header";
import { Player } from "@/components/Player";
import { TmusicData } from "@/interfaces/musics.interface";
import Image from "next/image";
import leagueOfLegends from "../../../assets/logo.svg";
import { SkipsNextAndPrevSection } from "@/components/SkipsNextAndPrevSection";
import styles from "./styles.module.scss";

const Playlist = async () => {
  const response = await api.get("/musics");
  const musics: TmusicData[] = response.data;

  return (
    <>
      <Header />
      <section className={styles.container__sectionPlaylist}>
        <Image src={leagueOfLegends} alt="league of legends" />
        <h2>RIOT GAMES</h2>

        <SkipsNextAndPrevSection musics={musics} />
      </section>
      <Player />
    </>
  );
};

export default Playlist;
