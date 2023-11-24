import { useEffect, useState, useContext, createContext } from "react";
import supabase from "../config/supabaseClient";
import { UserNameContext } from "../index";
import axios from "axios";
import Podcast from "./Podcast";
import Header from "./Header";
import Spinner from "./Spinner";
import createUpdatedDate from "../helpers/createUpdatedDate";
import Sort from "./Sort";
import { FavoritesContext } from "../index";
import Carousel from "./Carousel";
import { IPodcast } from "./Carousel";
import AudioPlayer from "./AudioPlayer";

interface Rerender {
  rerender: boolean;
  setRerender: Function;
}

export const RerenderContext = createContext<Rerender>({
  rerender: false,
  setRerender: () => {},
});

export const AudioContext = createContext({});
const Main = () => {
  // Provided to RerenderContext in order to make Main.tsx rerender when the back button in
  // DetailedPodcast is clicked
  const [rerender, setRerender] = useState(false);

  interface IAudio {
    audioLink: string;
    episodeName: string;
    seasonImage: string;
  }
  // AudioContext value
  const [audioInfo, setAudioInfo] = useState<IAudio>();
  /**
   * initial state of apiData. Array will be populated following the API call
   */
  const [apiData, setApiData] = useState([
    {
      id: "" as string,
      image: "" as string,
      seasons: [
        {
          season: 0,
          title: "",
          image: "",
          episodes: [{ description: " ", episode: 0, file: " ", title: " " }],
        },
      ],
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
  const { globalUserName } = useContext(UserNameContext);
  const { setGlobalFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    /**
     * Axios call to API to fetch necessary data and populate the array with the response
     */
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

    const getFavorites = async () => {
      const { data, error } = await supabase
        .from("favorite")
        .select("*")
        .eq("username", globalUserName);

      if (error) {
        setGlobalFavorites(null);
        console.error("Could not fetch favorites");
      }

      if (data) {
        setGlobalFavorites(data);
      }
    };

    getFavorites();
  }, [globalUserName, setGlobalFavorites, rerender]);

  // Keeps track of the sort option the user has selected
  const [sort, setSort] = useState("");
  // function that handles the sorting of the podcasts.
  const handleDataSort = () => {
    switch (sort) {
      case "a-z":
        return apiData.sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return apiData.sort((a, b) => b.title.localeCompare(a.title));
      case "updateAsc":
        return apiData.sort((a, b) => a.updated.localeCompare(b.updated));
      case "updateDesc":
        return apiData.sort((a, b) => b.updated.localeCompare(a.updated));
      default:
        return apiData;
    }
  };
  // Stores the sorted data to be used to filter through
  const sortedData = handleDataSort();

  const [randomArray, setRandomArray] = useState<IPodcast[]>([]);

  // Keeps track of the genre filter
  const [genreFilter, setGenreFilter] = useState("");

  const handleGenreFilterChange = (genre: string) => {
    setGenreFilter(genre);
  };

  useEffect(() => {
    // Set the array for the carousel to display some random podcast
    const randomPodcastArray = () => {
      let array = [] as IPodcast[];
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * sortedData.length);
        array[i] = {
          podcastTitle: sortedData[randomIndex].title,
          imageSrc: sortedData[randomIndex].image,
          podcastDescription: sortedData[randomIndex].description,
        };
      }

      setRandomArray(array);
    };

    randomPodcastArray();
  }, [sortedData]);

  // Create an array which holds the podcasts with the matching genres/ titles
  const filteredData = sortedData.filter((podcast) => {
    if (
      podcast.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
      podcast
    ) {
      return podcast;
    }
  });

  // Resets the genre filter
  const handleResetClick = () => {
    setGenreFilter("");
  };

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
        lastUpdated={createUpdatedDate(day, month, year)}
        description={podcast.description}
        image={podcast.image}
        id={parseInt(podcast.id)}
        seasons={podcast.seasons}
        genreFilter={genreFilter}
        setGenreFilter={handleGenreFilterChange}
      />
    );
  });

  return (
    <RerenderContext.Provider value={{ rerender, setRerender }}>
      <AudioContext.Provider value={{ audioInfo, setAudioInfo }}>
        <div>
          <Header
            setSearchFilter={setSearchFilter}
            searchFilter={searchFilter}
          />
          {apiData[1] === undefined && <Spinner />}
          {sortedData[1] ? <Carousel arrayOfPodcasts={randomArray} /> : <p></p>}
          <div className="sort--button--container">
            {genreFilter !== "" && (
              <button
                onClick={handleResetClick}
                className="primary--button reset--button"
              >
                Reset Genres
              </button>
            )}
            <Sort setSort={setSort} showShowSort={false} />
          </div>
          {apiData[1] !== undefined && podcastElements}
          {audioInfo && (
            <AudioPlayer
              audioSource={audioInfo.audioLink}
              imgSrc={audioInfo.seasonImage}
              episodeName={audioInfo.episodeName}
            />
          )}
        </div>
      </AudioContext.Provider>
    </RerenderContext.Provider>
  );
};

export default Main;
