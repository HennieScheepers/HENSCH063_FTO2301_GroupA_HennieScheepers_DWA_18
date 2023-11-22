import Image from "next/image";
import back from "../../public/icons/back.svg";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { FavoritesContext } from "..";
import Favorite from "./Favorite";
import Sort from "./Sort";

const UserProfile = (props: { setShowProfileView: MouseEventHandler }) => {
  const { globalFavorites } = useContext(FavoritesContext);

  useEffect(() => {}, [globalFavorites]);

  const [sort, setSort] = useState("");

  // function that handles the sorting of the podcasts.
  const handleDataSort = () => {
    switch (sort) {
      case "a-z":
        return globalFavorites.sort((a, b) =>
          a.episodes.localeCompare(b.episodes)
        );
      case "z-a":
        return globalFavorites.sort((a, b) =>
          b.episodes.localeCompare(a.episodes)
        );
      case "updateAsc":
        return globalFavorites.sort((a, b) => {
          const dateA = new Date(a.dateAdded).getTime();
          const dateB = new Date(b.dateAdded).getTime();
          return dateB - dateA;
        });

      case "updateDesc":
        return globalFavorites.sort((a, b) => {
          const dateA = new Date(a.dateAdded).getTime();
          const dateB = new Date(b.dateAdded).getTime();
          return dateA - dateB;
        });

      case "show-a-z":
        return globalFavorites.sort((a, b) => a.show.localeCompare(b.show));
      case "show-z-a":
        return globalFavorites.sort((a, b) => b.show.localeCompare(a.show));
      default:
        return globalFavorites;
    }
  };

  // Stores the sorted data to be used to filter through
  const sortedData = handleDataSort();

  const favoritesElements = sortedData.map((favorite, index) => (
    <Favorite
      key={index}
      episode={favorite.episodes}
      show={favorite.show}
      username={favorite.username}
      dateAdded={favorite.dateAdded}
    />
  ));

  return (
    <div className="main--profile--container">
      <button className="back--button" onClick={props.setShowProfileView}>
        <Image src={back} alt="back button" width={30} height={30} />
        Back
      </button>
      <div className="favorites">
        <h3 className="podcast--title">My Favorites</h3>
        <Sort setSort={setSort} showShowSort></Sort>
      </div>
      <div className="favorites--table">
        <div className="table--row table--heading podcast--info sticky">
          <div className="table--episode">Episode</div>
          <div className="table--show">Show</div>
          <div className="table--button">Actions</div>
        </div>
        {favoritesElements[0] ? (
          favoritesElements
        ) : (
          <h3 className="podcast--info">No favorirtes added.</h3>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
