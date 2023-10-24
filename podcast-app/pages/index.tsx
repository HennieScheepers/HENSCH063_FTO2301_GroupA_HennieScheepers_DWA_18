import spinner from "../public/icons/spinner.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Podcast from "./Podcast";
import Header from "./Header";
import Spinner from "./Spinner";
import createUpdatedDate from "./helpers/createUpdatedDate";
import Sort from "./Sort";

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
   * Keps track of the value entered into the search bar by the user. Used in a filter function
   * to disply only the podcasts which titles or genres container the search value
   */
  const [searchFilter, setSearchFilter] = useState("");

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
  const [sort, setSort] = useState("a-z");
  console.log(sort);

  // Create an array which holds the podcasts with the matching genres/ titles
  const filteredData = apiData.filter((podcast) => {
    if (podcast.title.toLowerCase().includes(searchFilter.toLowerCase())) {
      return podcast;
    }
  });

  let sortedData;

  // map through filtered elements to only display the filtered elements
  const podcastElements = filteredData.map((podcast) => {
    // Changing the updated string into a Date
    const day = new Date(podcast.updated).getUTCDate();
    const month = new Date(podcast.updated).getUTCMonth();
    const year = new Date(podcast.updated).getUTCFullYear();

    return (
      <Podcast
        key={podcast.id}
        title={podcast.title}
        seasons={podcast.seasons}
        lastUpdated={createUpdatedDate(day, month, year)}
        description={podcast.description}
        image={podcast.image}
        id={parseInt(podcast.id)}
      />
    );
  });

  return (
    <div>
      <Header setSearchFilter={setSearchFilter} searchFilter={searchFilter} />
      <Sort setSort={setSort} />
      {apiData[1] === undefined && <Spinner />}
      {apiData[1] !== undefined && podcastElements}
    </div>
  );
}
