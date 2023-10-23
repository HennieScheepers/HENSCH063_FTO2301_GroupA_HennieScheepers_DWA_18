import { useEffect, useState } from "react";
import axios from "axios";
import Podcast from "./Podcast";
import Header from "./Header";
import Spinner from "./Spinner";

export default function Home() {
  /**
   * initial state of apiData. Array will be populated following the API call
   */
  const [apiData, setApiData] = useState([
    {
      id: "" as string,
      image: "" as string,
      seasons: 0 as number,
      title: "" as string,
      updated: "" as string,
      genres: "" as string,
      description: "" as string,
    },
  ]);

  /**
   * Axios call to API to fetch necessary data and populate the array with the response
   */
  useEffect(() => {
    axios
      .get("https://podcast-api.netlify.app/shows")
      .then((res) => {
        setApiData(res.data);
      })
      .catch((error) =>
        console.error(
          "Something went wrong when calling https://podcast-api.netlify.app/shows. ",
          error
        )
      );
  }, []);

  const podcastElements = apiData.map((podcast) => {
    return (
      <Podcast
        key={podcast.id}
        title={podcast.title}
        seasons={podcast.seasons}
        lastUpdated={podcast.updated}
        description={podcast.description}
        image={podcast.image}
        id={parseInt(podcast.id)}
      />
    );
  });

  return (
    <div>
      <Header />
      {apiData[1] === undefined && <Spinner />}
      {apiData[1] !== undefined && podcastElements}
    </div>
  );
}
