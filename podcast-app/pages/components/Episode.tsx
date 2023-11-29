import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useContext, useEffect } from "react";

import { UserNameContext } from "../index";
import supabase from "../../public/config/supabaseClient";
import { FavoritesContext } from "../index";
import { RerenderContext } from "./Main";
import { AudioContext } from "./Main";

const Episode = (props: {
  title: string;
  id: number;
  showName: string;
  seasonNumber: number;
  isFavorited: boolean;
  file: string;
  currentEpisode: string | null;
  seasonImage: string | null;
}) => {
  // Global state for username. This gets set when the user logs in.
  const { globalUserName } = useContext(UserNameContext);

  // Global state for the favorites
  const { globalFavorites, setGlobalFavorites } = useContext(FavoritesContext);

  // A boolean value to force a rerender on the main component everytime the API data changes. This
  // is done to make a new API call in order to update the favorites.
  const { setRerender } = useContext(RerenderContext);

  // State and setter that determines if a episode has been favorited. Alongside it is the setter
  // for this value. If the episode was favorited the heart icon for the episode component will be
  // filled red to indicate to the user that this episode is favorited
  const [isFavorited, setIsFavorited] = useState(props.isFavorited);

  // const audio = new Audio(props.file);

  const audioContext = useContext(AudioContext);
  const { setAudioInfo } = audioContext || {};

  // Function to handle the event for when the play button is clicked.
  const handlePlayClick = () => {
    // if (props.currentEpisode !== props.title) {
    //   props.setAudioSource(props.file);
    //   props.setCurrentEpisode(props.title);
    // } else {
    //   audio.pause();
    // }
    if (props.seasonImage && setAudioInfo !== undefined) {
      setAudioInfo({
        audioLink: props.file,
        episodeName: props.title,
        seasonImage: props.seasonImage,
      });
    }
  };

  useEffect(() => {}, [props.isFavorited]);

  // Forms part of the handleRemoveFromFavorites click function. This function removes the favorited
  // episode from the favorite table in the database
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

  // The event handler for when the user clicks a filled heart icon to unfavorite an episode.
  const handleRemoveFromFavorites = () => {
    removeFromFavorites();
    setIsFavorited(false);
    setTimeout(() => setRerender((prevValue: boolean) => !prevValue), 100);
  };

  // Forms part of the handleFavoriteClick. This function will add the new favorite to the favorites
  // table. This table form a part of the database
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
          dateAdded: new Date(),
        };
        newGlobalFavorites.push(element);
      }

      setGlobalFavorites(newGlobalFavorites);
    }
    if (error) {
      console.error(error);
    }
  };

  // The event hadnler for when the user clicks on a unfilled heart in order to favorite an episode.
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
