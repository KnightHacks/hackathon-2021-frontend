import { useState } from "react";
import { GrVolume, GrVolumeMute } from "react-icons/gr";
import useSound from "use-sound";
import BackgroundMusic from "../assets/BackgroundMusic.mp3";

const VolumeButton = ({ open, setO }) => {
  const [volumeOn, setVolumeOn] = useState(false);
  const [play, { stop, isPlaying }] = useSound(BackgroundMusic);

  return (
    <GrVolume
      onClick={play}
      className={
        "text-4xl md:text-5xl cursor-pointer float-right " +
        (open ? "invisible" : "")
      }
    />
  );
};

export default VolumeButton;
