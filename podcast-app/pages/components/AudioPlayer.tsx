import { useEffect, useState } from "react";
import Image from "next/image";
import expandLessIcon from "../../public/icons/expand-less.svg";
import expandMoreIcon from "../../public/icons/expand-more.svg";
import { IAudio } from "./Main";

const AudioPlayer = (props: {
  audioSource: string;
  imgSrc: string;
  episodeName: string;
  audioInfo: IAudio;
  setAudioInfo: Function;
}) => {
  // Keeps track of the audio source to be loaded into the audio player
  const audio = props.audioSource;

  // Keeps track of the state that determines if the audio player should be expanded or not
  const [expand, setExpand] = useState(true);

  // Keeps track of the time stamp for the audio
  const [timeStamp, setTimeStamp] = useState("00:00:15");
  console.log(timeStamp);
  const icon = expand ? expandMoreIcon : expandLessIcon;

  const onExpandClick = () => {
    setExpand((prevValue) => !prevValue);
  };

  const onPlay = () => {
    const audioFile = new Audio(audio);
    audioFile.play();
  };

  useEffect(() => {
    console.log("rerendered");
  }, [props.episodeName, audio]);
  return (
    <>
      <div className="audio--player--container">
        <div className="button--container">
          <button
            onClick={onExpandClick}
            className="primary--button expand--button"
          >
            <Image src={icon} width={20} height={20} alt="expand icon"></Image>
          </button>
        </div>

        {expand && (
          <>
            <Image
              src={props.imgSrc}
              alt="Audio player image"
              width={100}
              height={100}
              className="audio--player--image"
              priority
            />
            <label htmlFor="audio-player">{props.episodeName}</label>
            <audio
              className="audio--player"
              controls
              controlsList="nodownload"
              id="audio-player"
              src={`${audio}`}
              onPlay={onPlay}
            ></audio>
          </>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
