"use client";
import { useUsers } from "@/hooks/users.hook";
import { NavBarMobile } from "./NavBarMobile";
import { ShowMenuButton } from "../Buttons/ShowMenuButton";
import styles from "./styles.module.scss";

const Header = () => {
  const { openNav, setIsOpenNav } = useUsers();

  return (
    <header className={styles.container__header}>
      {openNav ? <NavBarMobile /> : <ShowMenuButton />}

      <h1>MUSIC LEGENDS</h1>

      <div>
        <h3>Richard</h3>
        <div>
          <span>R</span>
        </div>
      </div>
    </header>
  );
};

export { Header };
