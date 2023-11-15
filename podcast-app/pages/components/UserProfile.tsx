import Image from "next/image";
import back from "../../public/icons/back.svg";
import { MouseEventHandler, useContext, useEffect } from "react";
import { FavoritesContext } from "..";
import Favorite from "./Favorite";

const UserProfile = (props: { setShowProfileView: MouseEventHandler }) => {
  const { globalFavorites } = useContext(FavoritesContext);
  const favoritesElements = globalFavorites.map((favorite, index) => (
    <Favorite
      key={index}
      episode={favorite.episodes}
      show={favorite.show}
      username={favorite.username}
    />
  ));
  useEffect(() => {}, [globalFavorites]);

  return (
    <div className="main--profile--container">
      <button className="back--button" onClick={props.setShowProfileView}>
        <Image src={back} alt="back button" width={30} height={30} />
        Back
      </button>
      <div className="favorites">
        <h3 className="podcast--title">My Favorites</h3>
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
