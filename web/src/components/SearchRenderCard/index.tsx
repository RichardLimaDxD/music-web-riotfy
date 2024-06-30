"use client";
import { Imusic, ImusicRender } from "@/interfaces/musics.interface";
import { SearchCreateCard } from "./SearchCreateCard";
import { useMusics } from "@/hooks/musics.hook";
import styles from "./styles.module.scss";

const SearchRenderCard = ({ music }: ImusicRender) => {
  const { search } = useMusics();

  const filteredMusic = music.filter((findMusic) => {
    return search === ""
      ? true
      : findMusic.name.toLowerCase().includes(search.toLowerCase()) ||
          findMusic.artist.toLowerCase().includes(search.toLowerCase()) ||
          findMusic.genre.toLowerCase().includes(search.toLowerCase()) ||
          findMusic.album.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <ul className={styles.container__musicCards}>
      {filteredMusic.map((music: Imusic) => (
        <SearchCreateCard key={music.id} musics={music} />
      ))}
    </ul>
  );
};

export { SearchRenderCard };
