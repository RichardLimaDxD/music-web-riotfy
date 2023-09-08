"use client";
import { ImusicCard } from "@/interfaces/musics.interface";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiRepeat, FiVolume2 } from "react-icons/fi";
import { RxReload } from "react-icons/rx";
import { PiArrowsInSimple } from "react-icons/pi";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import { PlayerButton } from "../../Buttons/PlayerButton";
import { Progress } from "../../Progress";
import { useMusics } from "@/hooks/musics.hook";

const CardMusic = ({ musics }: ImusicCard) => {
  const { currentMusic, handlePause, isPlaying, handleUpdateCurrentMusic } =
    useMusics();

  const isCurrentMusicPlaying =
    isPlaying && currentMusic?.src === musics.music_url;

  const handlePlay = () => {
    handleUpdateCurrentMusic(musics.music_url!);
  };

  return (
    <li>
      <Link href={`musics/${musics.id}`}>
        <div>
          <p>{musics.name}</p>
          <img
            src={musics?.cover_image}
            alt={musics?.name}
            width={60}
            height={45}
          />
        </div>
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
