"use client";
import { useMusics } from "@/hooks/musics.hook";
import { useDropzone } from "react-dropzone";
import { ImMusic } from "react-icons/im";
import styles from "./styles.module.scss";

const UploadMusicForm = () => {
  const { setMusicFile, setMusicInfo, musicInfo, setPage } = useMusics();

  const onDrop = (files: File[]) => {
    setMusicFile(files[0]);
  };

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
    },
  });
  const { getRootProps, getInputProps } = dropzone;

  return (
    <div className={styles.container__uploadMusicDiv}>
      <div>
        <h1>Salvar música</h1>
        <label>
          <div {...getRootProps()}>
            <ImMusic />
            <p>Arrasta e solte o áudio aqui</p>
            <p>- OU -</p>
            <button onClick={(e) => e.preventDefault()}>Busque aqui</button>
            <p>Áudios suportados: mp3</p>
          </div>
        </label>
        <input {...getInputProps()} />

        <div>
          <label>Nome</label>

          <input
            type="text"
            value={musicInfo?.name}
            onChange={(e) => {
              setMusicInfo({ ...musicInfo, name: e.target.value });
            }}
            placeholder="Nome da música..."
          />

          <label htmlFor="album">Album</label>

          <input
            type="text"
            id="album"
            value={musicInfo.album}
            onChange={(e) => {
              setMusicInfo({ ...musicInfo, album: e.target.value });
            }}
            placeholder="Nome do album..."
          />

          <label htmlFor="nameForm">Artista</label>

          <input
            type="text"
            id="nameForm"
            value={musicInfo.artist}
            onChange={(e) => {
              setMusicInfo({ ...musicInfo, artist: e.target.value });
            }}
            placeholder="Nome do artista..."
          />
          <button
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export { UploadMusicForm };
