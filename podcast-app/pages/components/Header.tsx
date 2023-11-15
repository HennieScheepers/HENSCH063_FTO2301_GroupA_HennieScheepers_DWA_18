import { ChangeEvent, useState } from "react";
import accountIcon from "../../public/icons/accountIcon.svg";
import searchIcon from "../../public/icons/searchIcon.svg";
import Image from "next/image";
import UserProfile from "./UserProfile";

const Header = (props: { setSearchFilter: Function; searchFilter: string }) => {
  // Handles the onChange event when the user types into the search bar.
  // This onChange event sets the searchFilter found in index.js
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const targetValue = target.value;
    props.setSearchFilter(targetValue);
  };

  // boolean value that determines if userProfile is to be displayed
  const [showUserProfile, setShowUserProfile] = useState(false);
  const handleProfileClick = () => {
    setShowUserProfile((prevValue) => !prevValue);
  };
  return (
    <div className="header">
      <h3 className="header--text">PodPlay</h3>
      <div className="header--button--container">
        <div className="search--container">
          <input
            className="search--input"
            type="text"
            name="searchFilter"
            value={props.searchFilter}
            placeholder="Search a podcast here.."
            onChange={handleFilterChange}
          />
          <button className="primary--button" onClick={handleProfileClick}>
            <Image
              src={accountIcon}
              alt="search icon"
              height={20}
              width={20}
            ></Image>
          </button>
        </div>
      </div>
      {showUserProfile && (
        <UserProfile setShowProfileView={handleProfileClick} />
      )}
    </div>
  );
};

export default Header;
