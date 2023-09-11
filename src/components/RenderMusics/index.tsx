"use client";
import { Imusic, ImusicRender } from "@/interfaces/musics.interface";
import { CardMusic } from "./CardMusic";
import { useMusics } from "@/hooks/musics.hook";
import { useEffect } from "react";
import styles from "./styles.module.scss";

const RenderMusics = ({ music }: ImusicRender) => {
  const { setMusic } = useMusics();

  useEffect(() => {
    setMusic(music);
  }, [music, setMusic]);

  return (
    <ul className={styles.container__musicCards}>
      {music?.map((musics: Imusic) => (
        <CardMusic key={musics.id} musics={musics} />
      ))}
    </ul>
  );
};

export { RenderMusics };
