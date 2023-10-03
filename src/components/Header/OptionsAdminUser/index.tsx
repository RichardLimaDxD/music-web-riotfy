import { useMusics } from "@/hooks/musics.hook";
import { useUsers } from "@/hooks/users.hook";
import Link from "next/link";
import { destroyCookie, setCookie } from "nookies";
import styles from "./styles.module.scss";

const OptionsAdminUser = () => {
  const { userOptions, logOut, setOpenSettingUser } = useUsers();

  const { handlePause } = useMusics();

  const handleProfileLogOut = () => {
    setCookie(null, "riotfy.token", "", {
      path: "/",
      domain: "localhost",
      maxAge: 0,
    });
    setCookie(null, "riotfy.isAdmin", "", {
      path: "/",
      domain: "localhost",
      maxAge: 0,
    });

    destroyCookie(null, "riotfy.token", {
      path: "/",
    });
    destroyCookie(null, "riotfy.isAdmin", {
      path: "/",
      domain: "https://riotfy-pd3thw5pf-richardlimadxd.vercel.app",
    });

    destroyCookie(null, "riotfy.isAdmin", {
      path: "/",
    });
    setCookie(null, "riotfy.isAdmin", "", {
      path: "/",

      maxAge: 0,
    });

    destroyCookie(null, "riotfy.token");
    destroyCookie(null, "riotfy.isAdmin");

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
