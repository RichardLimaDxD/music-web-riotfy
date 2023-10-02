import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles.module.scss";

const NavBarDesktop = () => {
  return (
    <nav className={styles.container__menuNavDesktop}>
      <ul>
        <li>
          <Link href={"/dashboard"}>Início</Link>
        </li>

        <li>
          <Link href={"/dashboard/search"}>Buscar</Link>
        </li>

        <li>
          <Link href={"/dashboard/playlist"}>Suas bibliotecas</Link>
        </li>
      </ul>
    </nav>
  );
};

export { NavBarDesktop };
