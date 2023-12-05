import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import expandLessIcon from "../../public/icons/expand-less.svg";
import expandMoreIcon from "../../public/icons/expand-more.svg";
import { AudioContext } from "./Main";

const AudioPlayer = () => {
  const audioInfo = useContext(AudioContext);

  // Keeps track of the audio source to be loaded into the audio player
  const audioFile = useRef(new Audio(audioInfo?.audioInfo.audioLink));
  const seasonImage = audioInfo?.audioInfo.seasonImage;
  const episodeName = audioInfo?.audioInfo.episodeName;

  // Keeps track of the state that determines if the audio player should be expanded or not
  const [expand, setExpand] = useState(true);
  // Assigns the appropriate source to "icon" depending on "expand" value
  const icon = expand ? expandMoreIcon : expandLessIcon;

  // The default timestamp whih is 0
  const initialTimestamp = localStorage.getItem("timeStamp")
    ? parseFloat(localStorage.getItem("timeStamp")!)
    : 0;
  const [timeStamp, setTimeStamp] = useState<number>(initialTimestamp);

  // An eevent listener that triggers when the user clicks on the expand button
  const onExpandClick = () => {
    setExpand((prevValue) => !prevValue);
  };

  useEffect(() => {
    const audioElement = audioFile.current;

    // Event listener for the "ended" event on the audio player
    audioElement.addEventListener("ended", () => {
      // Set the time stamp to 0 when the audio has finished playing
      setTimeStamp(0);
      setExpand(false);
    });

    // Event handlers fo the "pause" event on the audio player
    const handlePause = () => {
      localStorage.setItem(
        "timeStamp",
        JSON.stringify(audioElement.currentTime)
      );
      setTimeStamp(audioElement.currentTime);
    };

    // Event handler for the "play" event on the audio player
    const handlePlay = () => {
      if (timeStamp !== 0) {
        audioElement.currentTime = timeStamp;
      }
    };

    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("play", handlePlay);

    // Event listener for the "canplaythrough event handlers"
    audioElement.addEventListener("canplaythrough", () => {
      if (audioElement.paused) {
        if (timeStamp) {
          audioElement.currentTime = timeStamp;
        }
      }

      // Stroring the last listened to episode to local storage
      localStorage.setItem(
        "lastListened",
        JSON.stringify({
          audioLink: audioInfo?.audioInfo.audioLink || "",
          seasonImage: audioInfo?.audioInfo.seasonImage || "",
          episodeName: audioInfo?.audioInfo.episodeName || "no episode found",
        })
      );
    });

    // Reset timestamp and audio state when a new audio link is received
    if (audioInfo?.audioInfo.audioLink !== audioElement.src) {
      setTimeStamp(0);
      setExpand(true);
      audioElement.src = audioInfo?.audioInfo.audioLink || "";
      audioElement.load();
    }

    // Clean up event listeners when the component unmounts. Done mainly to avoid memory leaks
    return () => {
      audioElement.removeEventListener("ended", () => {});
      audioElement.removeEventListener("pause", handlePause);
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("canplaythrough", () => {});
    };
  }, [audioInfo, episodeName, timeStamp]);

  return (
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
            src={seasonImage ? seasonImage : ""}
            alt="Audio player image"
            width={100}
            height={100}
            className="audio--player--image"
            priority
          />
          <label htmlFor="audio-player">{episodeName}</label>
          <audio
            className="audio--player"
            controls
            controlsList="nodownload"
            id="audio-player"
            src={`${audioInfo?.audioInfo.audioLink}#t="00:00:00"`}
            autoPlay
          ></audio>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
