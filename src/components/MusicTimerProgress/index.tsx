"use client";
import { useMusics } from "@/hooks/musics.hook";
import { useEffect, useState } from "react";
import { PlayerButton } from "../Buttons/PlayerButton";

const secondsToMinutes = (sec: number | undefined) => {
  if (!sec) return "00:00";

  sec = Math.trunc(+sec);
  const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
  const seconds = String(sec % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const MusicTimerProgress = ({ music }: any) => {
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

  const {
    handlePause,
    isPlaying,
    handleUpdateCurrentMusic,
    setCurrentMusicName,
    setCurrentMusicArtist,
    setCurrentMusicId,
  } = useMusics();

  const isCurrentMusicPlaying =
    isPlaying && currentMusic?.src === music.music_url;

  const handlePlay = () => {
    handleUpdateCurrentMusic(music.music_url!);
    setCurrentMusicName(music.name);
    setCurrentMusicArtist(music.artist);
    setCurrentMusicId(music.id);
  };

  return (
    <>
      <div>
        <span>
          {secondsToMinutes(currentTime)} / {""}
          {secondsToMinutes(currentMusic?.duration)}
        </span>
      </div>

      <PlayerButton
        handlePlay={handlePlay}
        handlePause={handlePause}
        isPlaying={isCurrentMusicPlaying}
      />
    </>
  );
};

export { MusicTimerProgress };
