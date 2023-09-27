import { useUsers } from "@/hooks/users.hook";
import styles from "./styles.module.scss";

const DeleteUserModal = () => {
  const { setDeleteUserModal, deleteUser } = useUsers();

  return (
    <dialog className={styles.container__modalUserDelete}>
      <header>
        <h2>Tem certeza que deseja apagar seu perfil?</h2>
      </header>
      <div>
        <button onClick={() => deleteUser()}>Deletar</button>
        <button onClick={() => setDeleteUserModal(false)}>Fechar</button>
      </div>
    </dialog>
  );
};
export { DeleteUserModal };
