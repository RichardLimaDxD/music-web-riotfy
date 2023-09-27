"use client";
import { UserSettingForm } from "@/components/Forms/UserSettings";
import styles from "./styles.module.scss";

const UserModalPatch = () => {
  return (
    <dialog className={styles.container__userModal}>
      <header>
        <h2>Editar Perfil</h2>
      </header>

      <UserSettingForm />
    </dialog>
  );
};

export { UserModalPatch };
