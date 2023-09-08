import { Player } from "@/components/Player";
import { ImusicParams, TmusicData } from "@/interfaces/musics.interface";
import api from "@/services/api";

export const generateStaticParams = async () => {
  try {
    const response = await api.get<TmusicData[]>("/musics", {
      params: {
        _limit: 3,
        _page: 1,
      },
    });

    return response.data.map((music) => ({ id: String(music.id) }));
  } catch (error) {
    throw new Error("Faile to load musics!");
  }
};

const Musics = async ({ params }: ImusicParams) => {
  const response = await api.get<TmusicData>(`musics/${params.id}`);
  const music = response.data;

  return (
    <>
      <main>
        <h2>{music.name}</h2>
        <img
          src={music.cover_image}
          alt={music.name}
          width={300}
          height={300}
        />
      </main>
      <Player />
    </>
  );
};

export default Musics;
