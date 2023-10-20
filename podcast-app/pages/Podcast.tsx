import Image from "next/image";
import spinner from "../public/icons/spinner.svg";
import { HTMLAttributes, MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import DetailedPodcast from "./DetailedPodcast";

const Podcast = ({
  title,
  genres,
  seasons,
  lastUpdated,
  description,
  image,
  id,
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
  const [showID, setID] = useState("");
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
  const handleShowDetailedView = () =>
    setShowDetailedView((prevValue) => !prevValue);
  const getData = (event: MouseEvent) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.id !== null) {
      event.stopPropagation();
      setID(target.id);
    }
    handleShowDetailedView();
  };

  useEffect(() => {
    if (showID !== "") {
      axios
        .get(`https://podcast-api.netlify.app/id/${showID}`)
        .then((response) => {
          setShowData(response.data);
          console.log(response.data);
        });
    }
  }, [showID]);
  return (
    <div className="main--container">
      {title === "" && (
        <Image
          src={spinner}
          className="spinner"
          width={0}
          height={0}
          alt="spinner"
        />
      )}
      {title !== "" && (
        <div className="podcast--container" id={id} onClick={(e) => getData(e)}>
          <Image
            className="podcast--image"
            src={image}
            width={80}
            height={80}
            alt="podcast cover image"
            priority
          />
          <div className="podcast--info--container">
            <p className="podcast--title">{title}</p>
            <p className="podcast--info">Genres: {genres}</p>
            <p className="podcast--info">Seasons: {seasons}</p>
            <p className="podcast--info">Last updated: {lastUpdated}</p>
            <p className="podcast--info">Description:</p>
            <p className="podcast--description">{description}</p>
          </div>
        </div>
      )}
      {showDetailedView && showData.description !== "" && (
        <DetailedPodcast
          description={showData.description}
          genres={showData.genres}
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
