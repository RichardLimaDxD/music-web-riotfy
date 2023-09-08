import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href={""}>Início</Link>
          </li>

          <li>
            <Link href={""}>Buscar</Link>
          </li>

          <li>
            <Link href={""}>Suas bibliotecas</Link>
          </li>
        </ul>
      </nav>
      <h1>MUSIC LEGENDS</h1>

      <div>
        <p>Richard</p>
        <div>R</div>
      </div>
    </header>
  );
};

export { Header };
