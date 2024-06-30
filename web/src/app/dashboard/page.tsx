"use client";
import HeaderHome from "@/components/Header";
import { Player } from "@/components/Player";
import { RenderMusics } from "@/components/RenderMusics";
import { useMusics } from "@/hooks/musics.hook";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const { music } = useMusics();

  return (
    <>
      <HeaderHome />
      <main className={styles.container__dashboardMain}>
        <RenderMusics music={music} />
      </main>
      <Player />
    </>
  );
};

export default Dashboard;
