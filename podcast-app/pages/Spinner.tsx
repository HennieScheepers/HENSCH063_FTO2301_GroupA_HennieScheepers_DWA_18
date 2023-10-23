import spinner from "../public/icons/spinner.svg";
import Image from "next/image";

const Spinner = () => {
  return (
    <Image
      className="spinner"
      src={spinner}
      width={0}
      height={0}
      alt="spinner"
    ></Image>
  );
};

export default Spinner;
