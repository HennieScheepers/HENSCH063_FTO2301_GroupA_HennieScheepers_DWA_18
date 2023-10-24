import Image from "next/image";
import back from "../public/icons/back.svg";
import spinner from "../public/icons/spinner.svg";
import { ChangeEvent, useState } from "react";
import Season from "./Season";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DetailedPodcast = (props: {
  description: string;
  genres: string | undefined;
  id: number;
  image: string;
  seasons: [
    {
      season: number;
      title: string;
      image: string;
      episodes: [
        { description: string; episode: number; file: string; title: string }
      ];
    }
  ];
  title: string;
  updated: string;
  setShowDetailedView: () => void;
}) => {
  // Keeps track of whether or not the podcast image has finished loading
  const [isImageLoaded, setImageLoaded] = useState(false);

  // Keeps track of the season that has been selected by the user
  const [season, setSeason] = useState(1);

  // Map to create elements for the episodes of the seasons
  const episodeElements = props.seasons[season].episodes.map((episode) => (
    <p className="podcast--info" key={episode.episode}>
      {episode.title}
    </p>
  ));
  // Event handler that handles the onChange event for the Select. This determines
  // the season selected by the user
  const handleChange = (event: SelectChangeEvent<"">) => {
    const target = event.target;
    const value = target.value;
    setSeason(parseInt(value));
  };

  // Adds the number of seasons to the select element
  const seasonOptions = props.seasons.map((season) => (
    <MenuItem key={season.season} value={season.season}>
      {season.season}
    </MenuItem>
  ));
  return (
    <div className="detailed--podcast--main--container">
      <button className="back--button" onClick={props.setShowDetailedView}>
        <Image src={back} alt="back button" width={30} height={30} />
        Back
      </button>

      <Image
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
        <p className="podcast--title">{props.title}</p>
        <p className="podcast--info">Genres: {props.genres}</p>
        <p className="podcast--info">Seasons: {seasonOptions.length}</p>
        <p className="podcast--info">
          Last updated: {props.updated.toString()}
        </p>
        <p className="podcast--info">Description:</p>
        <p className="podcast--description">{props.description}</p>
        <div className="season--container">
          <div className="select--container">
            <p id="sort" className="podcast--title season--text">
              Season
            </p>
            <Select
              labelId="season"
              className="season--select"
              value={season}
              onChange={handleChange}
            >
              {seasonOptions}
            </Select>
          </div>
          <div className="episodes--container">{episodeElements}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPodcast;
