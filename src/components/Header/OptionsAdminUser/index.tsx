import { useMusics } from "@/hooks/musics.hook";
import { useUsers } from "@/hooks/users.hook";
import Link from "next/link";
import styles from "./styles.module.scss";

const OptionsAdminUser = () => {
  const { userOptions, logOut, setOpenSettingUser } = useUsers();

  const { handlePause } = useMusics();

  const handleProfileLogOut = () => {
    logOut();
    handlePause();
  };

  const userSettingEdit = () => {
    setOpenSettingUser((menu) => !menu);
  };

  return (
    <>
      {userOptions ? (
        <ul className={styles.container__optionsAdmin}>
          <li>
            <button onClick={() => userSettingEdit()}>Perfil</button>
          </li>

          <li>
            <button>
              <Link href={"/dashboard/upload"}>Uploud</Link>
            </button>
          </li>

          <li>
            <button onClick={() => handleProfileLogOut()}>Sair</button>
          </li>
        </ul>
      ) : null}
    </>
  );
};

export { OptionsAdminUser };
