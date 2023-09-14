import Link from "next/link";
import styles from "../styles.module.scss";

const NavBarDesktop = () => {
  return (
    <nav className={styles.container__menuNavDesktop}>
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

export { NavBarDesktop };
