import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import spinner from "../public/icons/spinner.svg";
import Podcast from "./Podcast";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

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
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const podcastElements = apiData.map((podcast) => (
    <Podcast
      key={podcast.id}
      title={podcast.title}
      genres={podcast.genres}
      seasons={podcast.seasons}
      lastUpdated={podcast.updated}
      description={podcast.description}
      image={podcast.image}
      id={podcast.id}
    />
  ));

  return (
    <div>
      <Header />
      {apiData[1] === undefined && (
        <Image
          className="spinner"
          src={spinner}
          width={0}
          height={0}
          alt="spinner"
        ></Image>
      )}
      {apiData[1] !== undefined && podcastElements}
    </div>
  );
}
