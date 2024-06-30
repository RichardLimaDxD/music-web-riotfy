"use client";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { PlayerButton } from "../Buttons/PlayerButton";
import { useMusics } from "@/hooks/musics.hook";
import { FiVolume2 } from "react-icons/fi";
import { PiArrowsInSimple } from "react-icons/pi";
import { AiFillHeart } from "react-icons/ai";
import { PlayerProgress } from "./PlayerProgress";
import { ChangeEvent } from "react";
import { ContainerTimerProgress } from "./ContainerTimerProgress";
import Image from "next/image";
import rotate from "../../assets/rotate-cw.svg";
import repeat from "../../assets/repeat.svg";
import Toastfy from "../Toastfy";
import styles from "./styles.module.scss";

const Player = () => {
  const {
    handlePLay,
    handlePause,
    isPlaying,
    skipNext,
    skipPrev,
    currentMusicName,
    currentMusic,
    music,
    setCurrentMusicName,
    setCurrentMusicArtist,
    currentMusicArtist,
    setVolume,
    volume,
    showVolume,
    setShowVolume,
  } = useMusics();

  const handleSkipNext = () => {
    try {
      skipNext();
      if (currentMusic) {
        const foundIndex = music.findIndex(
          (playListTrack) => currentMusic.src === playListTrack.music_url
        );
        if (foundIndex !== -1) {
          const nextIndex = (foundIndex + 1) % music.length;
          const nextMusic = music[nextIndex];
          if (nextMusic) {
            setCurrentMusicName(nextMusic.name);
            setCurrentMusicArtist(nextMusic.artist);
          }
        }
      }
    } catch (error) {
      Toastfy({ message: "Por favor, selecione uma música" });
    }
  };

  const handleSkipPrev = () => {
    try {
      skipPrev();
      if (currentMusic) {
        const foundIndex = music.findIndex(
          (playListTrack) => currentMusic.src === playListTrack.music_url
        );
        if (foundIndex !== -1) {
          const prevIndex = (foundIndex - 1 + music.length) % music.length;
          const prevMusic = music[prevIndex];
          if (prevMusic) {
            setCurrentMusicName(prevMusic.name);
            setCurrentMusicArtist(prevMusic.artist);
          }
        }
      }
    } catch (error) {
      Toastfy({ message: "Por favor, selecione uma música" });
    }
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
    if (currentMusic) {
      currentMusic.volume = newVolume / 100;
    }
  };

  const handleVolumeSetting = () => {
    setShowVolume((volume) => !volume);
  };

  return (
    <>
      <PlayerProgress />
      <footer className={styles.container__footerPlayer}>
        <div className={styles.container__divFooter}>
          <div className={styles.container__divHeart}>
            <button>
              <AiFillHeart />
            </button>
            <div>
              <h2>
                {currentMusicName ? currentMusicName : "Escolha uma música"}
              </h2>

              <p>{currentMusicArtist ? currentMusicArtist : "..."}</p>
            </div>
          </div>

          <div className={styles.container__divPlayerButton}>
            <button>
              <Image src={repeat} alt="repeat" />
            </button>

            <button type="button" onClick={() => handleSkipPrev()}>
              <GrFormPrevious />
            </button>

            <PlayerButton
              handlePause={handlePause}
              handlePlay={handlePLay}
              isPlaying={isPlaying}
            />

            <button type="button" onClick={() => handleSkipNext()}>
              <GrFormNext />
            </button>

            <button>
              <Image src={rotate} alt="rotate" />
            </button>
          </div>

          <div className={styles.container__divVolume}>
            <button onClick={() => handleVolumeSetting()}>
              <FiVolume2 />
            </button>
            {showVolume ? (
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />
            ) : null}

            <ContainerTimerProgress />
            <button>
              <a>
                <PiArrowsInSimple />
              </a>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export { Player };
