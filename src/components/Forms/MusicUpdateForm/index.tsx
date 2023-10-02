"use client";
import { useMusics } from "@/hooks/musics.hook";
import { Imusic, ImusicServer } from "@/interfaces/musics.interface";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

const MusicUpdateForm = ({ music }: ImusicServer) => {
  const { updateMusic, deleteMusic, setSettingMusic } = useMusics();
  const { handleSubmit, register } = useForm<Imusic>();

  const submit = (formData: Imusic) => {
    updateMusic(formData, music.id);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className={styles.container__updateMusicForm}
      >
        <h2>{music.name}</h2>
        <label htmlFor="">Nome:</label>
        <input type="text" defaultValue={music.name} {...register("name")} />

        <label htmlFor="">Album:</label>
        <input type="text" defaultValue={music.album} {...register("album")} />

        <label htmlFor="">Artista:</label>
        <input
          type="text"
          defaultValue={music.artist}
          {...register("artist")}
        />

        <label htmlFor="">Gênero:</label>
        <input type="text" defaultValue={music.genre} {...register("genre")} />

        <label htmlFor="">Ano:</label>
        <input type="text" defaultValue={music.year} {...register("year")} />

        <div>
          <button type="submit">Modificar</button>
          <button onClick={() => setSettingMusic(false)}>Cancelar</button>
        </div>
      </form>
      <button
        className={styles.button__style}
        onClick={() => deleteMusic(music.id)}
      >
        Excluir
      </button>
    </>
  );
};
export { MusicUpdateForm };
