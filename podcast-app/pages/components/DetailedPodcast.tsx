import Image from "next/image";
import back from "../../public/icons/back.svg";
import spinner from "../../public/icons/spinner.svg";
import { useState, useContext } from "react";
import { MenuItem } from "@mui/material";
import Season from "./Season";
import { RerenderContext } from "./Main";

const DetailedPodcast = (props: {
  description: string;
  genres: string | undefined;
  id: number;
  image: string;
  seasons: {
    season: number;
    title: string;
    image: string;
    episodes: {
      description: string;
      episode: number;
      file: string;
      title: string;
    }[];
  }[];
  title: string;
  updated: string;
  setShowDetailedView: () => void;
}) => {
  // Keeps track of whether or not the podcast image has finished loading
  const [isImageLoaded, setImageLoaded] = useState(false);
  const { setRerender } = useContext(RerenderContext);
  // Adds the number of seasons to the select element
  const seasonOptions = props.seasons?.map((season) => (
    <MenuItem key={season.season} value={season.season}>
      {season.season}
    </MenuItem>
  ));

  // Event handler for the back button. This will take the user back to the Main.tsx component and
  // also rerender it to get the new set of user favorites
  const handleBackClick = () => {
    setRerender((prevState: boolean) => !prevState);
    props.setShowDetailedView();
  };

  return (
    <div className="detailed--podcast--main--container">
      <button className="back--button" onClick={handleBackClick}>
        <Image src={back} alt="back button" width={30} height={30} />
        Back
      </button>
      <Image
        priority
        className={
          isImageLoaded ? "podcast--image detailed--podcast--image" : ""
        }
        src={isImageLoaded ? props.image : spinner}
        alt="podcast cover image"
        height={500}
        width={500}
        onLoadingComplete={() => setImageLoaded(true)}
      />

      <div className="podcast--info--container detailed--info--container">
        <div className="podcast--details">
          <p className="podcast--title">{props.title}</p>
          <p className="podcast--info">Genres: {props.genres}</p>
          <p className="podcast--info">Seasons: {seasonOptions?.length}</p>
          <p className="podcast--info">
            Last updated: {props.updated?.toString()}
          </p>
          <p className="podcast--info">Description:</p>
          <p className="podcast--description">{props.description}</p>
        </div>
        <Season
          seasons={props.seasons}
          seasonOptions={seasonOptions}
          showName={props.title}
        />
      </div>
    </div>
  );
};

export default DetailedPodcast;
