"use client";
import { useUsers } from "@/hooks/users.hook";
import { NavBarMobile } from "./NavBarMobile";
import { ShowMenuButton } from "../Buttons/ShowMenuButton";
import { NavBarDesktop } from "./NavBarDesktop";
import { UserModalPatch } from "../Modals/UserModal";
import { DeleteUserModal } from "../Modals/UserModal/deleteUserModal";
import { OptionsCommunUser } from "./OptionsCommunUser";
import { OptionsAdminUser } from "./OptionsAdminUser";
import { parseCookies } from "nookies";
import styles from "./styles.module.scss";

const HeaderHome = () => {
  const {
    openNav,
    user,
    openSettingUser,
    deleteUserModal,
    setUserOptions,
    userOptions,
  } = useUsers();

  const cookies = parseCookies();

  const isAdmin =
    cookies["riotfy.isAdmin"] === "true" ? (
      <OptionsAdminUser />
    ) : (
      <OptionsCommunUser />
    );

  const userSetting = () => {
    setUserOptions(!userOptions);
  };

  return (
    <header className={styles.container__header}>
      {openNav ? <NavBarMobile /> : <ShowMenuButton />}
      {openSettingUser ? <UserModalPatch /> : null}
      {deleteUserModal ? <DeleteUserModal /> : null}
      <NavBarDesktop />

      <h1>MUSIC LEGENDS</h1>

      <div onClick={() => userSetting()}>
        {user ? (
          <>
            <h3>{user.name}</h3>
            <div>
              <span>{user.name && user.name[0]}</span>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
        {isAdmin}
      </div>
    </header>
  );
};

export default HeaderHome;
