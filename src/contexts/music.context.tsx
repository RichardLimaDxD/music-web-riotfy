"use client";
import { createContext, use, useEffect, useState } from "react";
import { ImusicProps, Imusic } from "@/interfaces/musics.interface";
import { IpropsDefault } from "@/interfaces/users.interface";
import { usePlayPauseAudio } from "@/hooks/playPauseAudio";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/users.hook";
import api from "@/services/api";

const MusicContext = createContext<ImusicProps>({} as ImusicProps);

const MusicProvider = ({ children }: IpropsDefault) => {
  const [music, setMusic] = useState<Imusic[]>([]);
  const [musicClient, setMusicClient] = useState<Imusic[]>([]);
  const [currentMusicName, setCurrentMusicName] = useState<null | string>(null);
  const [volume, setVolume] = useState<number>(100);
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [currentMusicArtist, setCurrentMusicArtist] = useState<null | string>(
    null
  );
  const [currentMusic, setCurrentMusic] = useState<HTMLAudioElement | null>(
    null
  );
  const { isPlaying, setIsPlaying } = usePlayPauseAudio(currentMusic);
  const { setUser } = useUsers();
  const cookies = parseCookies();
  const router = useRouter();

  const retrieveMusicClient = async () => {
    try {
      const response = await api.get("/musics", {
        headers: {
          Authorization: `Bearer ${cookies["riotfy.token"]}`,
        },
      });
      setMusicClient(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cookies["riotfy.token"]) {
      retrieveMusicClient();
    }
  }, []);

  useEffect(() => {
    if (currentMusic) {
      currentMusic.volume = volume / 100;
    }

    currentMusic?.play();
  }, [volume, currentMusic]);

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
        currentMusicName,
        setCurrentMusicName,
        currentMusicArtist,
        setCurrentMusicArtist,
        volume,
        setVolume,
        showVolume,
        setShowVolume,
        musicClient,
        setMusicClient,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export { MusicContext, MusicProvider };
