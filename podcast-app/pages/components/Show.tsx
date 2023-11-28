import Favorite from "./Favorite";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { FavoritesContext, IFavorite } from "../index";

const Show = (props: { showName: string; episodes: IFavorite[] }) => {
  // get episodes from global favorites that matches show name and add them to an array
  const { globalFavorites } = useContext(FavoritesContext);

  const [episodes, setEpisodes] = useState<IFavorite[]>([]);

  useEffect(() => {
    const newEpisodes = globalFavorites.filter(
      (episode) => episode.show === props.showName
    );
    setEpisodes(newEpisodes);
  }, [globalFavorites, props.showName]);

  const episodeElements = episodes?.map((episode, index) => (
    <Favorite
      key={index}
      episode={episode.episodes}
      show={episode.show}
      username={episode.username}
      dateAdded={episode.dateAdded}
      season={episode.season}
    ></Favorite>
  ));

  // const episodeElements = episodes?.map((episode, index) => <Episode key={index} title={episode}></Episode>);
  // take that array and map through it to create the episode elements

  return (
    <div className="show--element">
      <h3 className="podcast--title">{props.showName}</h3>
      {/* Display the episode elements here */}
      {episodeElements}
    </div>
  );
};

export default Show;
