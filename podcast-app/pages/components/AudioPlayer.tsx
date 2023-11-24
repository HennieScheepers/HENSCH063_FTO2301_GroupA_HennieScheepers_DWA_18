import { use, useEffect, useState } from "react";
import Image from "next/image";
import expandLessIcon from "../../public/icons/expand-less.svg";
import expandMoreIcon from "../../public/icons/expand-more.svg";

const AudioPlayer = (props: {
  audioSource: string;
  imgSrc: string;
  episodeName: string;
}) => {
  // Keeps track of the audio source to be loaded into the audio player
  const audio = useState(props.audioSource);
  const [expand, setExpand] = useState(true);
  console.log(props.episodeName);
  const icon = expand ? expandMoreIcon : expandLessIcon;

  const onClick = () => {
    setExpand((prevValue) => !prevValue);
  };

  useEffect(() => {}, [props.episodeName]);
  return (
    <>
      <div className="audio--player--container">
        <button onClick={onClick} className="primary--button expand--button">
          <Image src={icon} width={20} height={20} alt="expand icon"></Image>
        </button>
        {expand && (
          <>
            <Image
              src={props.imgSrc}
              alt="Audio player image"
              width={50}
              height={50}
            />
            <label htmlFor="audio-player">{props.episodeName}</label>
            <audio
              className="audio--player"
              controls
              controlsList="nodownload"
              id="audio-player"
            >
              <source src={audio[0]} type="audio/mp3" />
            </audio>
          </>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
