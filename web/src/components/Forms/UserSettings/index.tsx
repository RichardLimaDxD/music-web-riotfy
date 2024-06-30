"use client";
import { useUsers } from "@/hooks/users.hook";
import { useForm } from "react-hook-form";
import { TuserSchema } from "@/interfaces/users.interface";
import styles from "./styles.module.scss";

const UserSettingForm = () => {
  const { register, handleSubmit } = useForm<TuserSchema>();

  const { user, updateUser, setOpenSettingUser, setDeleteUserModal } =
    useUsers();

  const submit = (formData: TuserSchema) => {
    updateUser(formData);
  };

  const handleOpenDeleteModal = () => {
    setOpenSettingUser(false);
    setDeleteUserModal(true);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={styles.container__formUserSetting}
    >
      <label htmlFor="">Nome:</label>
      <input
        type="text"
        defaultValue={user?.name}
        placeholder={user?.name}
        {...register("name")}
      />

      <div>
        <button type="submit">Modificar</button>
        <button onClick={() => handleOpenDeleteModal()}>Excluir perfil</button>
      </div>

      <button onClick={() => setOpenSettingUser(false)}>Fechar</button>
    </form>
  );
};

export { UserSettingForm };
