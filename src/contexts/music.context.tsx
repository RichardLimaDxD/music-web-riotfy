"use client";
import { createContext, useEffect, useState } from "react";
import { ImusicProps, Imusic } from "@/interfaces/musics.interface";
import { IpropsDefault } from "@/interfaces/users.interface";
import nookies from "nookies";
import { Player } from "@/components/Player";
import { usePlayPauseAudio } from "@/hooks/playPauseAudio";

const MusicContext = createContext<ImusicProps>({} as ImusicProps);

const MusicProvider = ({ children }: IpropsDefault) => {
  const cookies = nookies.get(null, "riotfy.token");
  const [music, setMusic] = useState<Imusic[]>([]);
  const [currentMusic, setCurrentMusic] = useState<HTMLAudioElement | null>(
    null
  );
  const { isPlaying, setIsPlaying } = usePlayPauseAudio(currentMusic);

  useEffect(() => {
    currentMusic?.play();
  }, [currentMusic]);

  const handlePLay = () => {
    currentMusic?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    currentMusic?.pause();
    setIsPlaying(false);
  };

  const handleUpdateCurrentMusic = (musicURL: string) => {
    currentMusic?.pause();
    setIsPlaying(true);
    setCurrentMusic(new Audio(musicURL));
  };

  const skipNext = () => {
    const foundIndex = music.findIndex(
      (playListTrack) => currentMusic?.src === playListTrack.music_url
    );

    if (foundIndex === music.length - 1) {
      setCurrentMusic(new Audio(music[0].music_url));
    } else {
      setCurrentMusic(new Audio(music[foundIndex + 1].music_url));
    }
  };

  const skipPrev = () => {
    const foundIndex = music.findIndex(
      (playListTrack) => currentMusic?.src === playListTrack.music_url
    );

    if (foundIndex === 0) {
      setCurrentMusic(new Audio(music[music.length - 1].music_url));
    } else {
      setCurrentMusic(new Audio(music[foundIndex - 1].music_url));
    }
  };

  return (
    <MusicContext.Provider
      value={{
        music,
        setMusic,
        currentMusic,
        setCurrentMusic,
        isPlaying,
        handlePLay,
        handlePause,
        handleUpdateCurrentMusic,
        skipNext,
        skipPrev,
      }}
    >
      {children}
      <Player />
    </MusicContext.Provider>
  );
};

export { MusicContext, MusicProvider };
