import { useMusics } from "@/hooks/musics.hook";
import { useUsers } from "@/hooks/users.hook";

const OptionsCommunUser = () => {
  const { userOptions, logOut, setOpenSettingUser } = useUsers();

  const { handlePause } = useMusics();

  const handleProfileLogOut = () => {
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
