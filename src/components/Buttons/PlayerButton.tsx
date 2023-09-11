import { IplayerButton } from "@/interfaces/musics.interface";
import { ImPause } from "react-icons/im";
import { GrCaretNext } from "react-icons/gr";
import styles from "./styles.module.scss";

const PlayerButton = ({
  handlePlay,
  handlePause,
  isPlaying,
}: IplayerButton) => {
  const callback = isPlaying ? handlePause : handlePlay;
  const Icons = isPlaying ? ImPause : GrCaretNext;

  return (
    <button
      className={styles.container__playerButton}
      type="button"
      onClick={callback}
    >
      <Icons size={13} />
    </button>
  );
};

export { PlayerButton };
