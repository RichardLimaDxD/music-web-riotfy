import { Metadata } from "next";
import styles from "./styles.module.scss";

export const metadata: Metadata = {
  title: "Riotfy",
  description: "Dashboard Musics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.container__dashboardBackground}>{children}</main>
  );
}
