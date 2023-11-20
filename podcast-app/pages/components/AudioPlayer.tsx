import { useState } from "react";
const AudioPlayer = (props: { audioSource: string }) => {
  // Keeps track of the audio source to be loaded into the audio player
  const [audio, setAudio] = useState(props.audioSource);

  return (
    <>
      <audio className="audio--player" controls controlsList="nodownload">
        sdasdasd
        <source src={audio} type="audio/mp3" />
      </audio>
    </>
  );
};

export default AudioPlayer;
