import { useMusics } from "@/hooks/musics.hook";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const secondsToMinutes = (sec: number | undefined) => {
  if (!sec) return "00:00";

  sec = Math.trunc(+sec);
  const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
  const seconds = String(sec % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const ContainerTimerProgress = () => {
  const { currentMusic } = useMusics();
  const [currentTime, setCurrentTime] = useState(currentMusic?.currentTime);

  useEffect(() => {
    if (!currentMusic) {
      return;
    }

    const eventTimeUpdate = () => {
      setCurrentTime(Math.trunc(currentMusic.currentTime));
    };

    currentMusic.addEventListener("timeupdate", eventTimeUpdate);

    return () => {
      currentMusic.removeEventListener("timeupdate", eventTimeUpdate);
    };
  }, [currentMusic]);

  return (
    <div className={styles.container__timerProgress}>
      <span>
        {secondsToMinutes(currentTime)}/
        {secondsToMinutes(currentMusic?.duration)}
      </span>
    </div>
  );
};

export { ContainerTimerProgress };
