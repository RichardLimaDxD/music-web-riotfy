"use client";
import { useUsers } from "@/hooks/users.hook";
import { NavBarMobile } from "./NavBarMobile";
import { ShowMenuButton } from "../Buttons/ShowMenuButton";
import styles from "./styles.module.scss";
import { useMusics } from "@/hooks/musics.hook";
import { NavBarDesktop } from "./NavBarDesktop";

const Header = () => {
  const { openNav, user, userOptions, logOut, setUserOptions } = useUsers();
  const { handlePause } = useMusics();

  const userSetting = () => {
    setUserOptions((menu) => !menu);
  };

  const handleProfileLogOut = () => {
    logOut();
    handlePause();
  };

  return (
    <header className={styles.container__header}>
      {openNav ? <NavBarMobile /> : <ShowMenuButton />}
      <NavBarDesktop />

      <h1>MUSIC LEGENDS</h1>

      <div>
        <h3>{user?.name}</h3>
        <div onClick={userSetting}>
          <span>{user?.name[0]}</span>
        </div>
        {userOptions ? (
          <ul>
            <li>
              <button>Perfil</button>
            </li>

            <li>
              <button onClick={() => handleProfileLogOut()}>Sair</button>
            </li>
          </ul>
        ) : null}
      </div>
    </header>
  );
};

export { Header };
