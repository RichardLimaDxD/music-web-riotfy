"use client";
import { MusicUpdateForm } from "@/components/Forms/MusicUpdateForm";
import { ImusicServer } from "@/interfaces/musics.interface";
import styles from "./styles.module.scss";

const UpdateMusicModal = ({ music }: ImusicServer) => {
  return (
    <dialog className={styles.container__musicUpdateForm}>
      <MusicUpdateForm music={music} />
    </dialog>
  );
};

export { UpdateMusicModal };
