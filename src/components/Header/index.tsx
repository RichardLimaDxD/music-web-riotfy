"use client";
import { useUsers } from "@/hooks/users.hook";
import { NavBarMobile } from "./NavBarMobile";
import { ShowMenuButton } from "../Buttons/ShowMenuButton";
import styles from "./styles.module.scss";

const Header = () => {
  const { openNav, user, userOptions, logOut, setUserOptions } = useUsers();

  const userSetting = () => {
    setUserOptions((menu) => !menu);
  };

  return (
    <header className={styles.container__header}>
      {openNav ? <NavBarMobile /> : <ShowMenuButton />}
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
              <button onClick={() => logOut()}>Sair</button>
            </li>
          </ul>
        ) : null}
      </div>
    </header>
  );
};

export { Header };
