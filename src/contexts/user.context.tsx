"use client";
import Toastfy from "@/components/Toastfy";
import api from "@/services/api";
import {
  IpropsDefault,
  IpropsUser,
  Iseasson,
  Iusers,
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
    } catch (error) {}
  };

  const logOut = () => {
    destroyCookie(null, "riotfy.token");

    setUser(null);

    Toastfy({ message: "Saindo...", isSucess: true });

    router.push("/");
  };

  useEffect(() => {
    if (cookies["riotfy.token"]) {
      retrieveUser();
    }
  }, [cookies["riotfy.token"]]);

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
      }}
    >
      <MusicProvider>{children}</MusicProvider>
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
