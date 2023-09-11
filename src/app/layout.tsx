import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/contexts/user.context";
import { ToastContainer } from "react-toastify";
import "@/scss/global.scss";
import "react-toastify/dist/ReactToastify.css";
import Favicon from "../assets/icon.webp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seasson",
  description: "Seasson",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
