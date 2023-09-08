import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { PlayerButton } from "../Buttons/PlayerButton";
import { useMusics } from "@/hooks/musics.hook";
import { FiRepeat, FiVolume2 } from "react-icons/fi";
import { PiArrowsInSimple } from "react-icons/pi";
import { AiFillHeart } from "react-icons/ai";
import { RxReload } from "react-icons/rx";

const Player = () => {
  const { handlePLay, handlePause, isPlaying, skipNext, skipPrev } =
    useMusics();
  return (
    <footer>
      <div>
        <button>
          <AiFillHeart />
        </button>

        <button>
          <RxReload />
        </button>

        <button>
          <FiRepeat />
        </button>

        <button onClick={() => skipPrev()}>
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

        <button>
          <FiVolume2 />
        </button>

        <button>
          <PiArrowsInSimple />
        </button>
      </div>
    </footer>
  );
};

export { Player };
