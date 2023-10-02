import { IplayerButton } from "@/interfaces/musics.interface";
import { ImPause } from "react-icons/im";
import { BsPlayCircle } from "react-icons/bs";
import styles from "./styles.module.scss";

const PlayerButton = ({
  handlePlay,
  handlePause,
  isPlaying,
}: IplayerButton) => {
  const callback = isPlaying ? handlePause : handlePlay;
  const Icons = isPlaying ? ImPause : BsPlayCircle;

  return (
    <button
      className={styles.container__playerButton}
      type="button"
      onClick={callback}
    >
      <Icons size={22} />
    </button>
  );
};

export { PlayerButton };
