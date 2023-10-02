import { MusicContext } from "@/contexts/music.context";
import { useContext } from "react";

const useMusics = () => useContext(MusicContext);

export { useMusics };
