"use client";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { PlayerButton } from "../Buttons/PlayerButton";
import { useMusics } from "@/hooks/musics.hook";
import { FiRepeat, FiVolume2 } from "react-icons/fi";
import { PiArrowsInSimple } from "react-icons/pi";
import { AiFillHeart } from "react-icons/ai";
import { RxReload } from "react-icons/rx";
import styles from "./styles.module.scss";
import { PlayerProgress } from "./PlayerProgress";

const Player = () => {
  const { handlePLay, handlePause, isPlaying, skipNext, skipPrev } =
    useMusics();
  return (
    <>
      <PlayerProgress />
      <footer className={styles.container__footerPlayer}>
        <div className={styles.container__divFooter}>
          <div className={styles.container__divHeart}>
            <button>
              <AiFillHeart />
            </button>
            <h2>musica</h2>

            <p>nome do artista</p>
          </div>

          <button>
            <FiRepeat />
          </button>

          <div className={styles.container__divPlayerButton}>
            <button type="button" onClick={() => skipPrev()}>
              <GrFormPrevious />
            </button>

            <PlayerButton
              handlePause={handlePause}
              handlePlay={handlePLay}
              isPlaying={isPlaying}
            />

            <button
              type="button"
              onClick={() => {
                skipNext();
              }}
            >
              <GrFormNext />
            </button>
          </div>

          <button>
            <RxReload />
          </button>

          <div className={styles.container__divVolume}>
            <button>
              <FiVolume2 />
            </button>

            <button>
              <PiArrowsInSimple />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export { Player };
