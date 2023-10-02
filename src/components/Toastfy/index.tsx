import { ItoastProps } from "@/interfaces/toastfy.interfaces";
import { toast } from "react-toastify";

const Toastfy = ({ message, isSucess = false }: ItoastProps) => {
  return isSucess
    ? toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    : toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
};

export default Toastfy;
