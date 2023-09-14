import { UserContext } from "@/contexts/user.context";
import { useContext } from "react";

const useUsers = () => useContext(UserContext);

export { useUsers };
