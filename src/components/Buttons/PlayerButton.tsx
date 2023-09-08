import { IplayerButton } from "@/interfaces/musics.interface";
import { ImPause } from "react-icons/im";
import { GrCaretNext } from "react-icons/gr";

const PlayerButton = ({
  handlePlay,
  handlePause,
  isPlaying,
}: IplayerButton) => {
  const callback = isPlaying ? handlePause : handlePlay;
  const Icons = isPlaying ? ImPause : GrCaretNext;

  return (
    <button type="button" onClick={callback}>
      <Icons />
    </button>
  );
};

export { PlayerButton };
