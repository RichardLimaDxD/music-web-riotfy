import { useMusics } from "@/hooks/musics.hook";
import { useUsers } from "@/hooks/users.hook";
import { destroyCookie } from "nookies";

const OptionsCommunUser = () => {
  const { userOptions, logOut, setOpenSettingUser } = useUsers();

  const { handlePause } = useMusics();

  const handleProfileLogOut = () => {
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
