import Image from "next/image";
import back from "../public/icons/back.svg";

const DetailedPodcast = ({
  description,
  genres,
  id,
  image,
  seasons,
  title,
  updated,
  setShowDetailedView,
}) => {
  return (
    <div className="detailed--podcast--main--container">
      <button className="back--button" onClick={setShowDetailedView}>
        <Image src={back} alt="back button" width={30} height={30} />
        Back
      </button>
      <Image
        className="podcast--image detailed--podcast--image"
        src={image}
        alt="podcast cover image"
        height={500}
        width={500}
      />
      <div className="podcast--info--container">
        <p className="podcast--title">{title}</p>
        <p className="podcast--info">Genres: {genres}</p>
        {/* <p className="podcast--info">Seasons: {seasons}</p> */}
        <p className="podcast--info">Last updated: {updated}</p>
        <p className="podcast--info">Description:</p>
        <p className="podcast--description">{description}</p>
      </div>
    </div>
  );
};

export default DetailedPodcast;
