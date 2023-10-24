import Image from "next/image";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Episode from "./Episode";
import { useContext, useEffect, useState } from "react";
import spinner from "../../public/icons/spinner.svg";
import { UserNameContext } from "../index";
import { FavoritesContext } from "../index";

const Season = (props: {
  showName: string;
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
  seasonOptions: React.JSX.Element[];
}) => {
  // Checks to see if the image has been successfully loaded
  const [isSeasonImageLoaded, setSeasonImageLoaded] = useState(false);

  // Keeps track of the season that has been selected by the user
  const [season, setSeason] = useState(1);

  // Keeps track of the current season image
  const [seasonImage, setSeasonImage] = useState(
    props.seasons[season - 1].image
  );

  const { globalUserName, setGlobalUsername } = useContext(UserNameContext);
  const { globalFavorites, setGlobalFavorites } = useContext(FavoritesContext);

  const [favorites, setFavorites] = useState([{}]);

  // useEffect to look for changes in the season value and give the season image a new value when a
  // change has been made to the season

  useEffect(() => {
    setSeasonImage(props.seasons[season - 1].image);

    const getFavorites = async () => {
      const data = await globalFavorites;

      if (data) {
        const episodesArray = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].show === props.showName) {
            const episode = data[i].episodes;
            episodesArray.push(episode);
          }
        }
        setFavorites(episodesArray);
        console.log(episodesArray);
      }
    };

    getFavorites();
  }, [
    props.showName,
    globalUserName,
    props.seasons,
    season,
    globalFavorites,
    setGlobalFavorites,
  ]);

  // Keeps track of the audio source to be loaded into the audio player
  const [audioSource, setAudioSource] = useState("");

  // keeps track of the currentEpisode
  const [currentEpisode, setCurrentEpisode] = useState(null);

  // Map to create elements for the episodes of the seasons
  const episodeElements = props.seasons[season - 1].episodes.map((episode) => {
    const isFavorited = favorites.includes(episode.title) ? true : false;
    return (
      <Episode
        key={episode.episode}
        title={episode.title}
        id={episode.episode}
        showName={props.showName}
        file={episode.file}
        seasonNumber={season}
        isFavorited={isFavorited}
        setAudioSource={setAudioSource}
        currentEpisode={currentEpisode}
        setCurrentEpisode={setCurrentEpisode}
      />
    );
  });

  // Event handler that handles the onChange event for the Select. This determines
  // the season selected by the user
  const handleChange = (event: SelectChangeEvent<"">) => {
    const target = event.target;
    const value = target.value;
    setSeason(parseInt(value));
  };

  return (
    <div className="season--container">
      <div className="select--container">
        <Image
          priority
          className="season--image"
          src={isSeasonImageLoaded ? seasonImage : spinner}
          alt="season image"
          height={60}
          width={60}
          onLoadingComplete={() => setSeasonImageLoaded(true)}
        />

        <p id="sort" className="podcast--title season--text">
          Season
        </p>
        <Select
          labelId="season"
          className="season--select"
          value={season.toString() as ""}
          onChange={handleChange}
        >
          {props.seasonOptions}
        </Select>
      </div>
      <p className="podcast--title season--text num--of--episodes">
        Episodes: {episodeElements.length}
      </p>
      <div className="episodes--container">{episodeElements}</div>
      {audioSource && (
        <>
          <h3>{currentEpisode}</h3>
          <audio className="audio--player" controls controlsList="nodownload">
            <source src={audioSource} type="audio/mp3" />
          </audio>
        </>
      )}
    </div>
  );
};

export default Season;
