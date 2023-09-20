"use client";
import { Header } from "@/components/Header";
import { useState } from "react";
import { useMusics } from "@/hooks/musics.hook";
import { Imusic } from "@/interfaces/musics.interface";

const Search = () => {
  const { musicClient } = useMusics();

  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const submit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setSearch(searchValue);
    setSearchValue("");
  };

  const filteredMusic = musicClient.filter((findMusic) => {
    return search === ""
      ? true
      : findMusic.name.toLowerCase().includes(search.toLowerCase()) ||
          findMusic.artist.toLowerCase().includes(search.toLowerCase()) ||
          findMusic.genre.toLowerCase().includes(search.toLowerCase()) ||
          findMusic.album.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Header />
      <section>
        <form onSubmit={submit}>
          <input
            onChange={(event) => setSearchValue(event.target.value)}
            value={searchValue}
            type="text"
            placeholder="Search music"
          />
          <button type="submit">Pesquisar</button>
        </form>

        {search && (
          <ul>
            {filteredMusic.map((music: Imusic) => (
              <li key={music.id}>
                <h2>{music.name}</h2>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default Search;
