"use client";
import { PlayerButton } from "../../Buttons/PlayerButton";
import { ImusicCard } from "@/interfaces/musics.interface";
import { useMusics } from "@/hooks/musics.hook";
import { Progress } from "../../Progress";
import styles from "../styles.module.scss";

const CardMusic = ({ musics }: ImusicCard) => {
  const {
    currentMusic,
    handlePause,
    isPlaying,
    handleUpdateCurrentMusic,
    setCurrentMusicName,
    setCurrentMusicArtist,
    setCurrentMusicId,
  } = useMusics();

  const isCurrentMusicPlaying =
    isPlaying && currentMusic?.src === musics.music_url;

  const handlePlay = () => {
    handleUpdateCurrentMusic(musics.music_url!);
    setCurrentMusicName(musics.name);
    setCurrentMusicArtist(musics.artist);
    setCurrentMusicId(musics.id);
  };

  const handleEvents = () => {
    if (isCurrentMusicPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <li className={styles.container__cards}>
      <a onClick={handleEvents}>
        <span>{musics.name}</span>
        <img
          src={musics?.cover_image}
          alt={musics?.name}
          width={60}
          height={45}
        />
      </a>

      <Progress musics={musics}>
        <PlayerButton
          handlePlay={handlePlay}
          handlePause={handlePause}
          isPlaying={isCurrentMusicPlaying}
        />
      </Progress>
    </li>
  );
};

export { CardMusic };
