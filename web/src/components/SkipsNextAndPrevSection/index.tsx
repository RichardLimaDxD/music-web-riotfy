"use client";
import { useMusics } from "@/hooks/musics.hook";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Toastfy from "../Toastfy";
import { AiFillHeart } from "react-icons/ai";
import styles from "./styles.module.scss";

const SkipsNextAndPrevSection = () => {
  const {
    skipNext,
    skipPrev,
    currentMusic,
    music,
    currentMusicName,
    currentMusicArtist,
    setCurrentMusicName,
    setCurrentMusicArtist,
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

      setCurrentPosition((prevPosition) => (prevPosition + 1) % music.length);

      if (currentMusic) {
        const nextMusic = music[(currentPosition + 1) % music.length];
        if (nextMusic) {
          setCurrentMusicName(nextMusic.name);
          setCurrentMusicArtist(nextMusic.artist);
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
        (prevPosition) => (prevPosition - 1 + music.length) % music.length
      );
      if (currentMusic) {
        const prevMusic =
          music[(currentPosition - 1 + music.length) % music.length];
        if (prevMusic) {
          setCurrentMusicName(prevMusic.name);
          setCurrentMusicArtist(prevMusic.artist);
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
          {currentPosition + 1}/{music.length}
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
