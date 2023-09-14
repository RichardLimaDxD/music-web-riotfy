"use client";
import { createContext, useEffect, useState } from "react";
import { ImusicProps, Imusic } from "@/interfaces/musics.interface";
import { IpropsDefault } from "@/interfaces/users.interface";
import { usePlayPauseAudio } from "@/hooks/playPauseAudio";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/users.hook";

const MusicContext = createContext<ImusicProps>({} as ImusicProps);

const MusicProvider = ({ children }: IpropsDefault) => {
  const [music, setMusic] = useState<Imusic[]>([]);
  const [currentMusic, setCurrentMusic] = useState<HTMLAudioElement | null>(
    null
  );
  const { isPlaying, setIsPlaying } = usePlayPauseAudio(currentMusic);
  const { setUser } = useUsers();
  const cookies = parseCookies();
  const router = useRouter();

  useEffect(() => {
    currentMusic?.play();
  }, [currentMusic]);

  useEffect(() => {
    if (!cookies["riotfy.token"]) {
      destroyCookie(null, "riotfy.token");

      setUser(null);
      router.push("/");
    }
  }, [cookies["riotfy.token"]]);

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
    </MusicContext.Provider>
  );
};

export { MusicContext, MusicProvider };
