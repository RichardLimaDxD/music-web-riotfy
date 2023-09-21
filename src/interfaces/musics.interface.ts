import { z } from "zod";
import { musicSchema } from "@/schemas/musics.schemas";
import { Dispatch, ReactNode, SetStateAction } from "react";

type TmusicData = z.infer<typeof musicSchema>;

interface ImusicCard {
  musics: TmusicData;
}

interface ImusicRender {
  music: TmusicData[];
}

interface IprogressProps {
  musics: TmusicData;
  children: ReactNode;
}

interface ImusicParams {
  params: {
    id: string;
  };
}

interface Imusic {
  id: string;
  name: string;
  album: string;
  artist: string;
  genre: string;
  year: string;
  cover_image?: string;
  music_url?: string;
}

interface IsearchMusic {
  filteredMusic: Imusic[];
}

interface ImusicProps {
  music: Imusic[];
  setMusic: Dispatch<SetStateAction<Imusic[]>>;
  currentMusic: HTMLAudioElement | null;
  setCurrentMusic: Dispatch<SetStateAction<HTMLAudioElement | null>>;
  isPlaying: boolean;
  handlePLay: () => void;
  handlePause: () => void;
  handleUpdateCurrentMusic: (musicURL: string) => void;
  skipNext: () => void;
  skipPrev: () => void;
  currentMusicName: string | null;
  setCurrentMusicName: Dispatch<SetStateAction<string | null>>;
  currentMusicArtist: string | null;
  setCurrentMusicArtist: Dispatch<SetStateAction<string | null>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  showVolume: boolean;
  setShowVolume: Dispatch<SetStateAction<boolean>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

interface IplayerButton {
  handlePlay: () => void;
  handlePause: () => void;
  isPlaying: boolean;
}

export type {
  Imusic,
  IplayerButton,
  ImusicParams,
  ImusicProps,
  TmusicData,
  ImusicCard,
  IprogressProps,
  ImusicRender,
  IsearchMusic,
};
