"use client";
import { useMusics } from "@/hooks/musics.hook";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";

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
    <div>
      <h1>Salvar música</h1>
      <div>
        <div>
          <div>
            <label htmlFor="gender">Gênero</label>
            <div>
              <input
                type="text"
                placeholder="heavy metal"
                value={musicInfo.genre}
                onChange={(e) => {
                  setMusicInfo({ ...musicInfo, genre: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="year">Ano</label>
              <div>
                <input
                  type="text"
                  placeholder="1970"
                  value={musicInfo.year}
                  onChange={(e) => {
                    setMusicInfo({ ...musicInfo, year: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
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
      </div>
      <div>
        <div>
          <div>
            <button
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              <span>Voltar</span>
            </button>
          </div>

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
    </div>
  );
};

export { UploadImageForm };
