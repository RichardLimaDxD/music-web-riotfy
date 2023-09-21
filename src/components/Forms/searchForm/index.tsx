"use client";
import { useMusics } from "@/hooks/musics.hook";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./styles.module.scss";

const SearchForm = () => {
  const { setSearch, searchValue, setSearchValue } = useMusics();

  const submit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setSearch(searchValue);
    setSearchValue("");
  };

  return (
    <form className={styles.container__searchForm} onSubmit={submit}>
      <input
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
        type="text"
        placeholder="Search music"
      />
      <button type="submit">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export { SearchForm };
