"use client";
import { useMusics } from "@/hooks/musics.hook";
import { useUsers } from "@/hooks/users.hook";
import { CiSettings } from "react-icons/ci";

const SettingButtonAdmin = () => {
  const { setSettingMusic } = useMusics();
  const { user } = useUsers();

  const isAdmin = user?.admin ? (
    <CiSettings cursor="pointer" onClick={() => setSettingMusic(true)} />
  ) : null;

  return <div>{isAdmin}</div>;
};

export { SettingButtonAdmin };
