"use client";
import { useMusics } from "@/hooks/musics.hook";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";
import styles from "./styles.module.scss";

const UploadImageForm = () => {
  const {
    setMusicInfo,
    musicInfo,
    musicFile,
    setPage,
    setCoverImage,
    coverImage,
    createMusic,
  } = useMusics();

  const onDrop = useCallback((files: File[]) => {
    setCoverImage(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"],
    },
  });

  const { getRootProps, getInputProps } = dropzone;

  return (
    <div className={styles.container__uploadImageDiv}>
      <div>
        <h1>Salvar música</h1>

        <div>
          <label htmlFor="gender">Gênero</label>
          <input
            type="text"
            placeholder="heavy metal"
            value={musicInfo.genre}
            onChange={(e) => {
              setMusicInfo({ ...musicInfo, genre: e.target.value });
            }}
          />

          <label htmlFor="year">Ano</label>
          <input
            type="text"
            placeholder="1970"
            value={musicInfo.year}
            onChange={(e) => {
              setMusicInfo({ ...musicInfo, year: e.target.value });
            }}
          />
        </div>
        <div {...getRootProps()}>
          <label htmlFor="dropzone-file">
            <div>
              <FaImage />
              <p>Arrasta e solte a capa aqui</p>
              <p>- OU -</p>
              <button onClick={(e) => e.preventDefault()}>Busque aqui</button>
              <p>Formatos suportados: jpg</p>
            </div>
          </label>
          <input {...getInputProps()} />
        </div>
        <button
          onClick={() => {
            setPage((currPage) => currPage - 1);
          }}
        >
          <span>Voltar</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(musicInfo, musicFile, coverImage);
            createMusic();
          }}
        >
          Finalizar Cadastro
        </button>
      </div>
    </div>
  );
};

export { UploadImageForm };
