import { ShowMenuButton } from "@/components/Buttons/ShowMenuButton";
import Link from "next/link";
import styles from "../styles.module.scss";

const NavBarMobile = () => {
  return (
    <nav className={styles.container__menuNavMobile}>
      <ShowMenuButton />
      <ul>
        <li>
          <Link href={""}>Início</Link>
        </li>

        <li>
          <Link href={""}>Buscar</Link>
        </li>

        <li>
          <Link href={""}>Suas bibliotecas</Link>
        </li>
      </ul>
    </nav>
  );
};

export { NavBarMobile };
