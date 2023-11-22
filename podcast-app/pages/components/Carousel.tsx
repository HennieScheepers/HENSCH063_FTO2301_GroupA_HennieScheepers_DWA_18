import Image from "next/image";
import CarouselItem from "./CarouselItem";
import { useEffect, useState } from "react";

export interface IPodcast {
  imageSrc: string;
  podcastTitle: string;
  podcastDescription: string;
}

const Carousel = (props: { arrayOfPodcasts: IPodcast[] }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (counter === 4) {
        setCounter(0);
      } else {
        setCounter((prevCounter) => (prevCounter + 1) % 4);
      }
    }, 4000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [counter]);

  const carouselElements = props.arrayOfPodcasts.map((podcast, index) => (
    <CarouselItem
      key={index}
      podcastTitle={podcast.podcastTitle}
      podcastDescription={podcast.podcastDescription}
      imageSrc={podcast.imageSrc}
      display={index === counter ? true : false}
    />
  ));

  return <div>{carouselElements}</div>;
};

export default Carousel;
