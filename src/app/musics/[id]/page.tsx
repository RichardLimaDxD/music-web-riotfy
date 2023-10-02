import api from "@/services/api";
import { ImusicParams, TmusicData } from "@/interfaces/musics.interface";
import { HeaderMusic } from "@/components/Header/HeaderMusic";
import { MusicTimerProgress } from "@/components/MusicTimerProgress";
import background from "./background.module.scss";
import styles from "./styles.module.scss";

export const generateStaticParams = async () => {
  try {
    const response = await api.get<TmusicData[]>("/musics", {
      params: {
        _limit: 3,
        _page: 1,
        revalidate: 1,
      },
    });

    return response.data.map((music) => ({ id: String(music.id) }));
  } catch (error) {
    throw new Error("Faile to load musics!");
  }
};

const Musics = async ({ params }: ImusicParams) => {
  const response = await api.get<TmusicData>(`musics/${params.id}`);
  const music: TmusicData = response.data;

  return (
    <div className={background.container__backgroundMusic}>
      <HeaderMusic music={music} />
      <section className={styles.container__musicSection}>
        <ul>
          <li>
            <img
              src={music.cover_image}
              alt={music.name}
              width={300}
              height={300}
            />

            <div>
              <h2>{music.album}</h2>
              <h1>{music.name}</h1>

              <p>{music.artist}</p>
              <span>{music.year}</span>
              <MusicTimerProgress music={music} />
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Musics;
