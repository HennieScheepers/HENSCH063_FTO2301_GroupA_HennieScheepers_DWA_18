import Image from "next/image";
import { MouseEvent, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import DetailedPodcast from "./DetailedPodcast";

import getGenreString from "../helpers/getGenreString";

import Spinner from "./Spinner";

const Podcast = (props: {
  title: string;
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
  lastUpdated: string;
  description: string;
  image: string;
  id: number;
  genreFilter: string;
  setGenreFilter: Function;
}) => {
  /**
   * Boolean value to determine if the main page is to be rendered or the detailed view
   */
  const [showDetailedView, setShowDetailedView] = useState(false);
  /**
   * Keeps track of the showID. setID is called everytime the user clicks
   * on one of the podcast--containers. This ID is used to request data about
   * a specific show from the API
   */
  const [showID, setID] = useState(props.id);
  /**
   * Keeps track of the show data. It is set within the API call everytime a user
   * clicks on one of the podcast--containers. The ID is attached to the API call
   * and the respone populates showData
   */
  const [showData, setShowData] = useState({
    description: "",
    genres: [],
    id: 0,
    image: "",
    seasons: [
      {
        season: 0,
        title: "",
        image: "",
        episodes: [{ description: "", episode: 0, file: "", title: "" }],
      },
    ],
    title: "",
    updated: "",
  });

  // Keep track of the genres in string form
  const [genreString, setGenreString] = useState("");

  // Change the genre into an array in order to create the genre buttons
  const genresArray = genreString.split(",");

  // Event listener to update the current genre filter when a genre button is clicked
  const handleGenreClick = (genre: string) => {
    props.setGenreFilter(genre);
  };

  const genreElements = genresArray.map((genre, index) => (
    <button
      className="genre--button"
      key={index}
      onClick={() => handleGenreClick(genre)}
    >
      {genre}
    </button>
  ));
  // Handler that sets the state needed for the detailed view
  const handleShowDetailedView = () =>
    setShowDetailedView((prevValue) => !prevValue);

  // Function that gets the data of the div that the user clicks on
  const getData = (event: MouseEvent) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.id !== null) {
      event.stopPropagation();
      setID(parseInt(target.id));
    }
    handleShowDetailedView();
  };

  useEffect(() => {
    if (showID) {
      axios
        .get(`https://podcast-api.netlify.app/id/${showID}`)
        .then((response) => {
          setShowData(response.data);
        })
        .catch((error) =>
          console.error(
            "Something went wrong when trying to call https://podcast-api.netlify.app/id/<ID>. ",
            error
          )
        );
    }
  }, [showID]);

  useEffect(() => {
    setGenreString(getGenreString(showData.genres));
  }, [showData.genres]);
  // Take the genres returned from the API and stringifies them into a single string for
  // easier rendering

  return (
    <div className="main--container">
      {genreString === "" && <Spinner />}
      {genreString !== "" && genreString.includes(props.genreFilter) && (
        <div className="podcast--container" id={props.id.toString()}>
          <Image
            className="podcast--image"
            src={props.image}
            width={80}
            height={80}
            alt="podcast cover image"
            priority
            onClick={(e) => getData(e)}
          />
          <div className="podcast--info--container">
            <p className="podcast--title" onClick={(e) => getData(e)}>
              {props.title}
            </p>
            <p className="podcast--info">
              Genres: <span className="genre--info">{genreElements}</span>
            </p>
            <p className="podcast--info">
              Seasons: {props.seasons as ReactNode}
            </p>
            <p className="podcast--info" onClick={(e) => getData(e)}>
              Last updated: {props.lastUpdated}
            </p>
            <p className="podcast--info" onClick={(e) => getData(e)}>
              Description:
            </p>
            <p className="podcast--description" onClick={(e) => getData(e)}>
              {props.description}
            </p>
          </div>
        </div>
      )}
      {showDetailedView && showData.image !== "" && (
        <DetailedPodcast
          description={showData.description}
          genres={genreString}
          id={showData.id}
          image={showData.image}
          seasons={showData.seasons}
          title={showData.title}
          updated={showData.updated}
          setShowDetailedView={handleShowDetailedView}
        />
      )}
      {showDetailedView && showData.image === "" && <Spinner />}
    </div>
  );
};

export default Podcast;
