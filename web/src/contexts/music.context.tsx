"use client";
import api from "@/services/api";
import { createContext, useEffect, useState } from "react";
import { ImusicProps, Imusic } from "@/interfaces/musics.interface";
import { IpropsDefault } from "@/interfaces/users.interface";
import { usePlayPauseAudio } from "@/hooks/playPauseAudio";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/users.hook";
import Toastfy from "@/components/Toastfy";

const MusicContext = createContext<ImusicProps>({} as ImusicProps);

const MusicProvider = ({ children }: IpropsDefault) => {
  const [currentMusicName, setCurrentMusicName] = useState<null | string>(null);

  const [settingMusic, setSettingMusic] = useState<boolean>(false);
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [volume, setVolume] = useState<number>(100);
  const [music, setMusic] = useState<Imusic[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [musicInfo, setMusicInfo] = useState({
    name: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
  });

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

  useEffect(() => {
    if (currentMusic) {
      currentMusic.volume = volume / 100;
    }
    getAllMusic();
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

  const uploadfiles = async (
    musicId: string,
    musicFile: File,
    coverImage: File
  ) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies["riotfy.token"]}`,
      },
    };

    const fd = new FormData();
    if (musicFile.name.includes("mp3") && coverImage.name.includes("jpg")) {
      fd.append("music", musicFile);
      fd.append("cover_image", coverImage);
      console.log(fd);
      const status = await api
        .patch(`/musics/upload/${musicId}`, fd, config)
        .then((res) => {
          return res.status;
        });
      return { status, musicId };
    }
    return { status: 400, musicId };
  };

  const createMusic = async () => {
    try {
      const response = await api.post("/musics", musicInfo, {
        headers: {
          Authorization: `Bearer ${cookies["riotfy.token"]}`,
        },
      });

      await uploadfiles(response.data.id, musicFile!, coverImage!);

      Toastfy({
        message: "Música cadastrada com sucesso!",
        isSucess: true,
      });
    } catch (error) {
      Toastfy({ message: "Erro ao criar a música" });
    }
  };

  const getAllMusic = async () => {
    try {
      const response = await api.get("/musics");

      setMusic(response.data);
    } catch (error) {}
  };

  const updateMusic = async (formData: Imusic, id: string) => {
    try {
      await api.patch(`/musics/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${cookies["riotfy.token"]}`,
        },
      });
      setSettingMusic(false);
      Toastfy({ message: "Música modificada com sucesso!", isSucess: true });
    } catch (error) {
      setSettingMusic(false);
      Toastfy({ message: "Erro ao editar informações da música!" });
    }
  };

  const deleteMusic = async (id: string) => {
    try {
      await api.delete(`/musics/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies["riotfy.token"]}`,
        },
      });

      setSettingMusic(false);
      router.push("/dashboard");
      Toastfy({ message: "Música apagada com sucesso!", isSucess: true });
    } catch (error) {
      Toastfy({ message: "Erro ao apagar a música!" });
      setSettingMusic(false);
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
        search,
        setSearch,
        searchValue,
        setSearchValue,
        page,
        setPage,
        musicInfo,
        setMusicInfo,
        musicFile,
        setMusicFile,
        coverImage,
        setCoverImage,
        createMusic,
        updateMusic,
        deleteMusic,
        settingMusic,
        setSettingMusic,
        getAllMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export { MusicContext, MusicProvider };
