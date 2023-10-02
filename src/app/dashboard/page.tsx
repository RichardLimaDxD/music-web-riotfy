import api from "@/services/api";
import { Header } from "@/components/Header";
import { TmusicData } from "@/interfaces/musics.interface";
import { RenderMusics } from "@/components/RenderMusics";
import { Player } from "@/components/Player";
import styles from "./styles.module.scss";

const Dashboard = async () => {
  const response = await api.get("/musics");
  const music: TmusicData[] = response.data;

  return (
    <>
      <Header />
      <main className={styles.container__dashboardMain}>
        <RenderMusics music={music} />
      </main>
      <Player />
    </>
  );
};

export const revalidate = 1;
export default Dashboard;
