"use client";
import { useRouter } from "next/navigation";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useMusics } from "@/hooks/musics.hook";
import { UpdateMusicModal } from "@/components/Modals/UpdateMusicModal";
import { ImusicServer } from "@/interfaces/musics.interface";
import { SettingButtonAdmin } from "@/components/Buttons/SettingButtonAdmin";
import styles from "./styles.module.scss";

const HeaderMusic = ({ music }: ImusicServer) => {
  const router = useRouter();

  const { settingMusic, setSettingMusic } = useMusics();

  const handleButtonEvent = () => {
    router.push("/dashboard");
    setSettingMusic(false);
  };

  return (
    <header className={styles.container__musicHeader}>
      {settingMusic && <UpdateMusicModal music={music} />}
      <BsFillArrowLeftCircleFill
        cursor="pointer"
        onClick={() => handleButtonEvent()}
      />
      <SettingButtonAdmin />
    </header>
  );
};

export { HeaderMusic };
