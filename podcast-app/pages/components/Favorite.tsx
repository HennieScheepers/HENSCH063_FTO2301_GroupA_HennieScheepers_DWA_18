import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { MouseEvent, useContext } from "react";
import supabase from "../config/supabaseClient";
import { FavoritesContext } from "..";

const Favorite = (props: {
  episode: string;
  show: string;
  username: string;
  dateAdded: Date;
}) => {
  const { globalFavorites, setGlobalFavorites } = useContext(FavoritesContext);
  const handleRemoveClick = async (event: MouseEvent) => {
    const { error } = await supabase
      .from("favorite")
      .delete()
      .eq("username", props.username)
      .eq("show", props.show)
      .eq("episodes", props.episode);

    if (error) {
      console.error(error);
    }

    let newGlobalFavorites = [...globalFavorites];
    for (let i = 0; i < newGlobalFavorites.length; i++) {
      const element = newGlobalFavorites[i];
      if (
        props.show === newGlobalFavorites[i].show &&
        props.episode === newGlobalFavorites[i].episodes &&
        props.username === newGlobalFavorites[i].username
      ) {
        newGlobalFavorites.splice(i, 1);
      }
    }

    setGlobalFavorites(newGlobalFavorites);
  };

  const dateAdded = new Date(props.dateAdded);
  return (
    <div className="table--row podcast--info">
      <div className="table--episode">
        {props.episode}
        <div>
          <p className="favorite--date">
            Added: {dateAdded.toLocaleTimeString()}{" "}
            {dateAdded.toLocaleDateString()}{" "}
          </p>
        </div>
      </div>
      <div className="table--show">{props.show}</div>
      <button
        onClick={(event) => handleRemoveClick(event)}
        className="secondary--button table--button"
      >
        <DeleteOutlineIcon />
      </button>
    </div>
  );
};

export default Favorite;
