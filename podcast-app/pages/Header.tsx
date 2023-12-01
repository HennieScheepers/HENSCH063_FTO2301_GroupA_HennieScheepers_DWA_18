import { ChangeEvent } from "react";
import accountIcon from "../public/icons/accountIcon.svg";
import searchIcon from "../public/icons/searchIcon.svg";
import Image from "next/image";

const Header = (props: { setSearchFilter: Function; searchFilter: string }) => {
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const targetValue = target.value;
    props.setSearchFilter(targetValue);
  };
  return (
    <div className="header">
      <h3 className="header--text">Header</h3>
      <div className="header--button--container">
        <div className="search--container">
          <input
            className="search--input"
            type="text"
            name="searchFilter"
            value={props.searchFilter}
            onChange={handleFilterChange}
          />
          <button className="primary--button">
            <Image
              src={searchIcon}
              alt="search icon"
              height={20}
              width={20}
            ></Image>
          </button>
        </div>

        <button className="primary--button">
          <Image
            src={accountIcon}
            alt="search icon"
            height={20}
            width={20}
          ></Image>
        </button>
      </div>
    </div>
  );
};

export default Header;
