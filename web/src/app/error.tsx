"use client";

import { useEffect } from "react";
import styles from "./styles.module.scss";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container__errorStyle}>
      <h1>Erro ao carregar ou encontrar a página...</h1>
      <button type="button" onClick={reset}>
        Tentar novamente
      </button>
    </div>
  );
}
