"use client";
import { useMusics } from "@/hooks/musics.hook";
import { ImusicsData } from "@/interfaces/musics.interface";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Toastfy from "../Toastfy";
import styles from "./styles.module.scss";
import { AiFillHeart } from "react-icons/ai";

const SkipsNextAndPrevSection = ({ musics }: ImusicsData) => {
  const {
    skipNext,
    skipPrev,
    currentMusic,
    music,
    currentMusicName,
    currentMusicArtist,
    setCurrentMusicName,
    setCurrentMusicArtist,
    setCurrentMusicId,
  } = useMusics();

  const [currentPosition, setCurrentPosition] = useState<number>(0);

  useEffect(() => {
    if (currentMusic) {
      const foundIndex = music.findIndex(
        (playListTrack) => currentMusic.src === playListTrack.music_url
      );
      if (foundIndex !== -1) {
        setCurrentPosition(foundIndex);
      }
    }
  }, [currentMusic, music]);

  const handleSkipNext = () => {
    try {
      skipNext();

      setCurrentPosition((prevPosition) => (prevPosition + 1) % musics.length);

      if (currentMusic) {
        const nextMusic = music[(currentPosition + 1) % musics.length];
        if (nextMusic) {
          setCurrentMusicName(nextMusic.name);
          setCurrentMusicArtist(nextMusic.artist);
          setCurrentMusicId(nextMusic.id);
        }
      }
    } catch (error) {
      Toastfy({ message: "Por favor, selecione uma música" });
    }
  };

  const handleSkipPrev = () => {
    try {
      skipPrev();
      setCurrentPosition(
        (prevPosition) => (prevPosition - 1 + musics.length) % musics.length
      );
      if (currentMusic) {
        const prevMusic =
          music[(currentPosition - 1 + musics.length) % musics.length];
        if (prevMusic) {
          setCurrentMusicName(prevMusic.name);
          setCurrentMusicArtist(prevMusic.artist);
          setCurrentMusicId(prevMusic.id);
        }
      }
    } catch (error) {
      Toastfy({ message: "Por favor, selecione uma música" });
    }
  };

  return (
    <>
      <div className={styles.container__divSkipsNextAndPrevSection}>
        <button onClick={handleSkipPrev}>
          <MdArrowBackIosNew />
        </button>

        <span>
          {currentPosition + 1}/{musics.length}
        </span>

        <button onClick={handleSkipNext}>
          <MdArrowForwardIos />
        </button>
      </div>

      <div className={styles.container__divCurrentName}>
        <div>
          <h2>{currentMusicName ? currentMusicName : "Escolha uma música"}</h2>
          <AiFillHeart />
        </div>
        <p>{currentMusicArtist ? currentMusicArtist : "..."}</p>
      </div>
    </>
  );
};

export { SkipsNextAndPrevSection };
