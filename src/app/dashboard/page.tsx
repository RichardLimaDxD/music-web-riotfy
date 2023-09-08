import api from "@/services/api";
import { Header } from "@/components/Header";
import { TmusicData } from "@/interfaces/musics.interface";
import { RenderMusics } from "@/components/RenderMusics";

export const revalidade = 3600;

const Dashboard = async () => {
  const response = await api.get("/musics");
  const music: TmusicData[] = response.data;

  return (
    <>
      <Header />
      <main>
        <RenderMusics music={music} />
      </main>
    </>
  );
};

export default Dashboard;
