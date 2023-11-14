import { useState, createContext } from "react";
import Auth from "./components/Auth";
import Main from "./components/Main";

interface IUserName {
  globalUserName: string;
  setGlobalUsername: Function;
}

export const UserNameContext = createContext<IUserName>({
  globalUserName: "",
  setGlobalUsername: () => {},
});

interface IFavorite {
  show: string;
  episodes: string;
  id: number;
  season: number;
  username: string;
}

interface IFavorites {
  globalFavorites: IFavorite[];
  setGlobalFavorites: Function;
}
export const FavoritesContext = createContext<IFavorites>({
  globalFavorites: [],
  setGlobalFavorites: () => {},
});

export default function Home() {
  const [globalUserName, setGlobalUsername] = useState("");
  console.log(globalUserName);
  const [globalFavorites, setGlobalFavorites] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const displayComponent = isLoggedIn ? (
    <Main />
  ) : (
    <Auth isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
  );

  return (
    <UserNameContext.Provider
      value={{
        globalUserName,
        setGlobalUsername,
      }}
    >
      <FavoritesContext.Provider
        value={{ globalFavorites, setGlobalFavorites }}
      >
        <div>{displayComponent}</div>
      </FavoritesContext.Provider>
    </UserNameContext.Provider>
  );
}
