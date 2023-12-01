import { useState, createContext } from "react";
import Auth from "./components/Auth";
import Main from "./components/Main";
import image from "../public/PodPlay..png";

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
  dateAdded: Date;
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
  const [globalFavorites, setGlobalFavorites] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const displayComponent = isLoggedIn ? (
    <Main />
  ) : (
    <Auth isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
  );

  console.log(image);

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
        <title>Listen to all your favorite podcasts.</title>
        <meta name="title" content="Listen to all your favorite podcasts." />
        <meta
          name="description"
          content="PODPLAY is a podcast platform where you can listen to all of your podcasts on demand!"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://zesty-speculoos-58258f.netlify.app/"
        />
        <meta
          property="og:title"
          content="Listen to all your favorite podcasts."
        />
        <meta
          property="og:description"
          content="PODPLAY is a podcast platform where you can listen to all of your podcasts on demand!"
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://zesty-speculoos-58258f.netlify.app/"
        />
        <meta
          property="twitter:title"
          content="Listen to all your favorite podcasts."
        />
        <meta
          property="twitter:description"
          content="PODPLAY is a podcast platform where you can listen to all of your podcasts on demand!"
        />
        <meta
          property="twitter:image"
          content="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <div>{displayComponent}</div>
      </FavoritesContext.Provider>
    </UserNameContext.Provider>
  );
}
