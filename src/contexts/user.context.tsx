"use client";
import Toastfy from "@/components/Toastfy";
import api from "@/services/api";
import {
  IpropsDefault,
  IpropsUser,
  Iseasson,
  Iusers,
  TuserSchema,
} from "@/interfaces/users.interface";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { MusicProvider } from "./music.context";

const UserContext = createContext({} as IpropsUser);

const UserProvider = ({ children }: IpropsDefault) => {
  const [user, setUser] = useState<Iusers | null>(null);
  const [openNav, setIsOpenNav] = useState<boolean>(false);
  const [userOptions, setUserOptions] = useState<boolean>(false);
  const [openSettingUser, setOpenSettingUser] = useState<boolean>(false);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const cookies = parseCookies();
  const router = useRouter();

  const createUser = async (formData: Iusers) => {
    try {
      const response = await api.post<Iusers>("/users", formData);
      const { data } = response;
      setUser(data);

      Toastfy({ message: "Usuário criado com sucesso!", isSucess: true });
      router.push("/");
    } catch (error) {
      Toastfy({ message: "Usuário já existe!" });
    }
  };

  const seasson = async (formData: Iseasson) => {
    try {
      const response = await api.post("/login", formData);
      const { token } = response.data;
      setCookie(null, "riotfy.token", token);
      setUser(response.data);
      router.push("/dashboard");
      Toastfy({ message: "Bem vindo(a)!", isSucess: true });
    } catch (error) {
      Toastfy({
        message: "Verifique suas informações de usuário!",
      });
    }
  };

  const retrieveUser = async () => {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${cookies["riotfy.token"]}`,
        },
      });
      setUser(response.data);
      const { admin } = response.data;
      setCookie(null, "riotfy.isAdmin", admin);
    } catch (error) {}
  };

  const logOut = () => {
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

    setUser(null);
    setUserOptions(false);

    Toastfy({ message: "Saindo...", isSucess: true });

    router.push("/");
  };

  const updateUser = async (formData: TuserSchema) => {
    try {
      const response = await api.patch(`/users/${user?.id}`, formData, {
        headers: {
          Authorization: `Bearer ${cookies["riotfy.token"]}`,
        },
      });

      setUser(response.data);
      setOpenSettingUser(false);

      Toastfy({ message: "Perfil modificado!", isSucess: true });
    } catch (error) {
      Toastfy({
        message: "Erro ao modificar perfil, verifique as informações!",
      });
      setOpenSettingUser(false);
    }
  };

  const deleteUser = async () => {
    try {
      await api.delete(`/users/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${cookies["riotfy.token"]}`,
        },
      });
      setDeleteUserModal(false);
      setOpenSettingUser(false);

      destroyCookie(null, "riotfy.token");

      setUser(null);

      Toastfy({ message: "Perfil Deletado!", isSucess: true });

      router.push("/");
    } catch (error) {
      Toastfy({
        message: "Algo deu errado ao deletar o perfil,tente novamente!",
      });
    }
  };

  useEffect(() => {
    if (cookies["riotfy.token"]) {
      retrieveUser();
    }
  }, [cookies["riotfy.token"]]);

  useEffect(() => {
    if (!cookies["riotfy.token"]) {
      destroyCookie(null, "riotfy.token");
      destroyCookie(null, "riotfy.isAdmin");
    }
  }, [cookies["riotfy.token"], cookies["riotfy.isAdmin"]]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        createUser,
        seasson,
        retrieveUser,
        logOut,
        openNav,
        setIsOpenNav,
        userOptions,
        setUserOptions,
        updateUser,
        openSettingUser,
        setOpenSettingUser,
        deleteUser,
        deleteUserModal,
        setDeleteUserModal,
      }}
    >
      <MusicProvider>{children}</MusicProvider>
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
