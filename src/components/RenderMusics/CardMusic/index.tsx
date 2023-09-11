"use client";
import { ImusicCard } from "@/interfaces/musics.interface";
import Link from "next/link";
import { PlayerButton } from "../../Buttons/PlayerButton";
import { Progress } from "../../Progress";
import { useMusics } from "@/hooks/musics.hook";
import styles from "../styles.module.scss";

const CardMusic = ({ musics }: ImusicCard) => {
  const { currentMusic, handlePause, isPlaying, handleUpdateCurrentMusic } =
    useMusics();

  const isCurrentMusicPlaying =
    isPlaying && currentMusic?.src === musics.music_url;

  const handlePlay = () => {
    handleUpdateCurrentMusic(musics.music_url!);
  };

  return (
    <li className={styles.container__cards}>
      <Link href={`musics/${musics.id}`}>
        <span>{musics.name}</span>
        <img
          src={musics?.cover_image}
          alt={musics?.name}
          width={60}
          height={45}
        />
      </Link>

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
