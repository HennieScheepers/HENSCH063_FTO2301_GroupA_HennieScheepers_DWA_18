import { use, useEffect, useState } from "react";
import Image from "next/image";
import expandLessIcon from "../../public/icons/expand-less.svg";
import expandMoreIcon from "../../public/icons/expand-more.svg";
import closeIcon from "../../public/icons/close.svg";

const AudioPlayer = (props: {
  audioSource: string;
  imgSrc: string;
  episodeName: string;
  setAudioInfo: Function;
}) => {
  // Keeps track of the audio source to be loaded into the audio player
  const audio = props.audioSource;
  const [expand, setExpand] = useState(true);
  const icon = expand ? expandMoreIcon : expandLessIcon;

  const onExpandClick = () => {
    setExpand((prevValue) => !prevValue);
  };

  // const onCloseClick = () => {
  //   audio.pause();
  //   props.setAudioInfo({});
  // };

  useEffect(() => {}, [props.episodeName]);
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
          {/* <button onClick={onCloseClick} className="primary--button">
            <Image
              src={closeIcon}
              width={20}
              height={20}
              alt="expand icon"
            ></Image>
          </button> */}
        </div>

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
              <source src={audio} type="audio/mp3" />
            </audio>
          </>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
