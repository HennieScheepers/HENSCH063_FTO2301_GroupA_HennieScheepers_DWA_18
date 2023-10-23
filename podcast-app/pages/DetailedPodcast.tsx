import Image from "next/image";
import back from "../public/icons/back.svg";

const DetailedPodcast = (props: {
  description: string;
  genres: string | undefined;
  id: number;
  image: string;
  seasons: number;
  title: string;
  updated: string;
  setShowDetailedView: () => void;
}) => {
  return (
    <div className="detailed--podcast--main--container">
      <button className="back--button" onClick={props.setShowDetailedView}>
        <Image src={back} alt="back button" width={30} height={30} />
        Back
      </button>
      <Image
        className="podcast--image detailed--podcast--image"
        src={props.image}
        alt="podcast cover image"
        height={500}
        width={500}
      />
      <div className="podcast--info--container">
        <p className="podcast--title">{props.title}</p>
        <p className="podcast--info">Genres: {props.genres}</p>
        {/* <p className="podcast--info">Seasons: {seasons}</p> */}
        <p className="podcast--info">
          Last updated: {props.updated.toString()}
        </p>
        <p className="podcast--info">Description:</p>
        <p className="podcast--description">{props.description}</p>
      </div>
    </div>
  );
};

export default DetailedPodcast;
