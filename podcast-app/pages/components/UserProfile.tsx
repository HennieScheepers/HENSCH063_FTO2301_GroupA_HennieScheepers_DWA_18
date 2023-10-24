import Image from "next/image";
import back from "../../public/icons/back.svg";
import { MouseEventHandler, useContext } from "react";
import { FavoritesContext } from "..";
import icon from "../../public/icons/deleteIcon.svg";

const UserProfile = (props: { setShowProfileView: MouseEventHandler }) => {
  const globalFavorites = useContext(FavoritesContext).globalFavorites;
  console.log(globalFavorites);

  return (
    <div className="main--profile--container">
      <button className="back--button" onClick={props.setShowProfileView}>
        <Image src={back} alt="back button" width={30} height={30} />
        Back
      </button>
      <div className="favorites">
        <h3 className="podcast--title">My Favorites</h3>
      </div>
      {/* {favoritesElements} */}
    </div>
  );
};

export default UserProfile;
