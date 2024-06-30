import { useMusics } from "@/hooks/musics.hook";
import { useUsers } from "@/hooks/users.hook";
import { destroyCookie, setCookie } from "nookies";

const OptionsCommunUser = () => {
  const { userOptions, logOut, setOpenSettingUser } = useUsers();

  const { handlePause } = useMusics();

  const handleProfileLogOut = () => {
    setCookie(null, "riotfy.token", "", {
      path: "/",

      maxAge: 0,
    });
    setCookie(null, "riotfy.isAdmin", "", {
      path: "/",

      maxAge: 0,
    });

    destroyCookie(null, "riotfy.token", {
      path: "/",
    });
    destroyCookie(null, "riotfy.isAdmin", {
      path: "/",
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
        <ul>
          <li>
            <button onClick={() => userSettingEdit()}>Perfil</button>
          </li>

          <li>
            <button onClick={() => handleProfileLogOut()}>Sair</button>
          </li>
        </ul>
      ) : null}
    </>
  );
};

export { OptionsCommunUser };
