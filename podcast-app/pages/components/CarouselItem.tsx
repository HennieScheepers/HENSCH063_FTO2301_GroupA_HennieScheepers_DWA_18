import Image from "next/image";

const CarouselItem = (props: {
  podcastTitle: string;
  podcastDescription: string;
  imageSrc: string;
  display: boolean;
}) => {
  return (
    <>
      {props.display && (
        <div className="carousel--container">
          <h3 className="podcast--tile carousel--title">
            {props.podcastTitle}
          </h3>
          <Image
            src={props.imageSrc}
            alt={"Podcast Image"}
            width={300}
            height={300}
            className="carousel--podcast"
          ></Image>
          <p className="podcast--description carousel--description">
            {props.podcastDescription}
          </p>
        </div>
      )}
    </>
  );
};

export default CarouselItem;
