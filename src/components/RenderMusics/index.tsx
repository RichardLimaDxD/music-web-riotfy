"use client";
import { Imusic, ImusicRender } from "@/interfaces/musics.interface";
import { CardMusic } from "./CardMusic";
import { useMusics } from "@/hooks/musics.hook";
import { useEffect } from "react";

const RenderMusics = ({ music }: ImusicRender) => {
  const { setMusic } = useMusics();

  useEffect(() => {
    setMusic(music);
  }, [music, setMusic]);

  return (
    <ul>
      {music?.map((musics: Imusic) => (
        <CardMusic key={musics.id} musics={musics} />
      ))}
    </ul>
  );
};

export { RenderMusics };
