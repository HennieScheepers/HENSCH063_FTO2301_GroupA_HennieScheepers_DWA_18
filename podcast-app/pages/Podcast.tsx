import Image from "next/image";
import spinner from "../public/icons/spinner.svg";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import DetailedPodcast from "./DetailedPodcast";
import getGenreString from "./getGenreString";

const Podcast = (props: {
  title: string;
  seasons: number;
  lastUpdated: string;
  description: string;
  image: string;
  id: number;
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
    seasons: [],
    title: "",
    updated: "",
  });
  console.log(showData.genres);

  const [genreString, setGenreString] = useState("");
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
    if (showID !== undefined) {
      axios
        .get(`https://podcast-api.netlify.app/id/${showID}`)
        .then((response) => {
          setShowData(response.data);
          console.log(response.data);
        })
        .catch((error) =>
          console.error(
            "Something went wrong when tryin to call https://podcast-api.netlify.app/id/<ID>. ",
            error
          )
        );
    }
  }, [showID]);

  useEffect(() => {
    setGenreString(getGenreString(showData.genres));
  });
  // Take the genres returned from the API and stringifies them into a single string for
  // easier rendering

  return (
    <div className="main--container">
      {genreString === "" && (
        <Image
          src={spinner}
          className="spinner"
          width={0}
          height={0}
          alt="spinner"
        />
      )}
      {genreString !== "" && (
        <div
          className="podcast--container"
          id={props.id.toString()}
          onClick={(e) => getData(e)}
        >
          <Image
            className="podcast--image"
            src={props.image}
            width={80}
            height={80}
            alt="podcast cover image"
            priority
          />
          <div className="podcast--info--container">
            <p className="podcast--title">{props.title}</p>
            <p className="podcast--info">Genres: {genreString}</p>
            <p className="podcast--info">Seasons: {props.seasons}</p>
            <p className="podcast--info">Last updated: {props.lastUpdated}</p>
            <p className="podcast--info">Description:</p>
            <p className="podcast--description">{props.description}</p>
          </div>
        </div>
      )}
      {showDetailedView && showData.description !== "" && (
        <DetailedPodcast
          description={showData.description}
          genres={genreString}
          id={showData.id}
          image={showData.image}
          seasons={showData.seasons[0]}
          title={showData.title}
          updated={showData.updated}
          setShowDetailedView={handleShowDetailedView}
        />
      )}
    </div>
  );
};

export default Podcast;
