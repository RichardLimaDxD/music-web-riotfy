"use client";
import { useMusics } from "@/hooks/musics.hook";
import { useDropzone } from "react-dropzone";
import { ImMusic } from "react-icons/im";

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
    <div>
      <div>
        <p>Salvar música</p>

        <div>
          <div>
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
          </div>
          <div>
            <div>
              <label>Nome</label>
              <div>
                <input
                  type="text"
                  value={musicInfo?.name}
                  onChange={(e) => {
                    setMusicInfo({ ...musicInfo, name: e.target.value });
                  }}
                  placeholder="Iron man"
                />
              </div>
              <div>
                <label htmlFor="album" className="user-form-label">
                  Album
                </label>
                <div>
                  <input
                    type="text"
                    value={musicInfo.album}
                    onChange={(e) => {
                      setMusicInfo({ ...musicInfo, album: e.target.value });
                    }}
                    placeholder="Paranoid"
                  />
                </div>
                <div>
                  <label htmlFor="name">Artista</label>
                  <div>
                    <input
                      type="text"
                      value={musicInfo.artist}
                      onChange={(e) => {
                        setMusicInfo({ ...musicInfo, artist: e.target.value });
                      }}
                      placeholder="Black Sabbath"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
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
