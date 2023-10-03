"use client";
import { UploadImageForm } from "@/components/Forms/Uploads/UploadImageForm";
import { UploadMusicForm } from "@/components/Forms/Uploads/UploadMusicForm";
import Header from "@/components/Header";
import { useMusics } from "@/hooks/musics.hook";
import styles from "./styles.module.scss";

const Upload = () => {
  const { page } = useMusics();

  const pageDisplay = page === 0 ? <UploadMusicForm /> : <UploadImageForm />;

  return (
    <>
      <Header />
      <main className={styles.container__mainUpload}>
        <form>
          <div>{pageDisplay}</div>
        </form>
      </main>
    </>
  );
};

export default Upload;
