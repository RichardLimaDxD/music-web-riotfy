import { useEffect, useRef } from "react";
import { IprogressProps } from "@/interfaces/musics.interface";
import { useMusics } from "@/hooks/musics.hook";

const Progress = ({ musics, children }: IprogressProps) => {
  const progressDivRef = useRef<HTMLDivElement>(null);
  const { currentMusic } = useMusics();

  useEffect(() => {
    if (currentMusic?.src !== musics.music_url) {
      return;
    }

    const eventTimeUpdate = () => {
      if (!currentMusic) {
        return;
      }

      const progress = (currentMusic.currentTime / currentMusic.duration) * 100;

      const roundProgress = String(Math.round(progress));

      progressDivRef.current?.style.setProperty(
        "--progress",
        `${roundProgress}%`
      );
    };

    currentMusic?.addEventListener("timeupdate", eventTimeUpdate);

    return () => {
      currentMusic?.removeEventListener("timeupdate", eventTimeUpdate);
    };
  }, [currentMusic, musics]);

  return <div ref={progressDivRef}>{children}</div>;
};

export { Progress };
