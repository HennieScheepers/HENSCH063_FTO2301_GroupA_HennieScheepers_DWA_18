import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useContext, useEffect } from "react";
import { UserNameContext } from "../index";
import supabase from "../config/supabaseClient";
import { FavoritesContext } from "../index";
import { RerenderContext } from "./Main";

const Episode = (props: {
  title: string;
  id: number;
  showName: string;
  seasonNumber: number;
  isFavorited: boolean;
  file: string;
  currentEpisode: string | null;
  setCurrentEpisode: Function;
  setAudioSource: Function;
}) => {
  // Global state for username
  const { globalUserName, setGlobalUsername } = useContext(UserNameContext);

  // Global state for the favorites
  const { globalFavorites, setGlobalFavorites } = useContext(FavoritesContext);

  const { rerender, setRerender } = useContext(RerenderContext);

  // let initialFavorite = false;
  // for (let i = 0; i < globalFavorites.length; i++) {
  //   if (
  //     globalFavorites[i].show === props.showName &&
  //     globalFavorites[i].episodes === props.title &&
  //     globalFavorites[i].season === props.seasonNumber
  //   ) {
  //     initialFavorite = true;
  //   }
  // }

  // console.log(`${props.title} initial Favorite : ${initialFavorite}`);
  const [isFavorited, setIsFavorited] = useState(props.isFavorited);

  const audio = new Audio(props.file);

  const handlePlayClick = () => {
    if (props.currentEpisode !== props.title) {
      props.setAudioSource(props.file);
      props.setCurrentEpisode(props.title);
    } else {
      audio.pause();
    }
  };

  const addToFavorites = async () => {
    const { data, error } = await supabase.from("favorite").upsert([
      {
        username: globalUserName,
        show: props.showName,
        season: props.seasonNumber,
        episodes: props.title,
      },
    ]);

    if (data) {
      const newGlobalFavorites = [...globalFavorites];
      for (let i = 0; i < newGlobalFavorites.length; i++) {
        const element = {
          username: globalUserName,
          show: props.showName,
          season: props.seasonNumber,
          episodes: props.title,
          id: props.id,
        };
        newGlobalFavorites.push(element);
      }

      setGlobalFavorites(newGlobalFavorites);
    }
    if (error) {
      console.error(error);
    }
  };

  const removeFromFavorites = async () => {
    const { error } = await supabase
      .from("favorite")
      .delete()
      .eq("username", globalUserName)
      .eq("show", props.showName)
      .eq("season", props.seasonNumber)
      .eq("episodes", props.title);
    if (error) {
      console.log(error);
    }

    let newGlobalFavorites = [...globalFavorites];
    for (let i = 0; i < newGlobalFavorites.length; i++) {
      const element = newGlobalFavorites[i];
      if (
        props.showName === newGlobalFavorites[i].show &&
        props.title === newGlobalFavorites[i].episodes &&
        props.seasonNumber === newGlobalFavorites[i].season
      ) {
        newGlobalFavorites.splice(i, 1);
      }
    }

    setGlobalFavorites(newGlobalFavorites);
  };

  useEffect(() => {}, [props.isFavorited]);

  const handleRemoveFromFavorites = () => {
    removeFromFavorites();
    setIsFavorited(false);
    setTimeout(() => setRerender((prevValue: boolean) => !prevValue), 100);
    console.log("removed");
  };

  const handleFavoriteClick = () => {
    addToFavorites();
    setIsFavorited(true);
    console.log("added");
    setTimeout(() => setRerender((prevValue: boolean) => !prevValue), 100);
  };
  return (
    <div>
      <p className="podcast--info episode--text">
        {`${props.id}. ${props.title}`}
        <span className="icon--container">
          <button className="secondary--button" onClick={handlePlayClick}>
            <PlayArrowIcon />
          </button>
          <button
            className="secondary--button"
            onClick={
              props.isFavorited
                ? handleRemoveFromFavorites
                : handleFavoriteClick
            }
          >
            {props.isFavorited ? (
              <FavoriteIcon className="favorite--filled" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
        </span>
      </p>
    </div>
  );
};

export default Episode;
