import { useMusics } from "@/hooks/musics.hook";
import { useEffect, useRef } from "react";

const PlayerProgress = () => {
  const { currentMusic } = useMusics();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputRange = inputRef.current;

    if (!currentMusic || !inputRange) {
      return;
    }

    const eventTimeUpdate = () => {
      const progress =
        (currentMusic?.currentTime / currentMusic?.duration) * 100;
      inputRange.style.backgroundSize = `${progress}% 100%`;
      inputRange.value = String(progress);
    };

    const updatePositionMusic = (event: Event) => {
      const input = event.target as HTMLInputElement;

      const newCurrentTime = (currentMusic.duration * +input.value) / 100;
      currentMusic.currentTime = newCurrentTime;
    };

    currentMusic?.addEventListener("timeupdate", eventTimeUpdate);
    inputRange.addEventListener("input", updatePositionMusic);

    return () => {
      currentMusic?.removeEventListener("timeupdate", eventTimeUpdate);
      inputRange.addEventListener("input", updatePositionMusic);
    };
  });

  return <input type="range" />;
};

export { PlayerProgress };
