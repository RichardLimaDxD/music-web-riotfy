import { useUsers } from "@/hooks/users.hook";
import { RiMenu2Line } from "react-icons/ri";
import styles from "./styles.module.scss";

const ShowMenuButton = () => {
  const { setIsOpenNav } = useUsers();

  const showMenu = () => {
    setIsOpenNav((menu) => !menu);
  };

  return (
    <button className={styles.container__buttonMenu} onClick={showMenu}>
      <RiMenu2Line />
    </button>
  );
};

export { ShowMenuButton };
