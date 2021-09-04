import { useState } from "react";
import { IconContext } from "react-icons";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";

import useSound from "use-sound";
import BackgroundMusic from "../assets/BackgroundMusic.mp3";

const VolumeButton = () => {
  const [volumeOn, setVolumeOn] = useState(false);
  const [play, { pause }] = useSound(BackgroundMusic);

  return (
    <IconContext.Provider
      value={{
        color: "white",
        className: "text-4xl md:text-5xl cursor-pointer",
      }}
    >
      {volumeOn ? (
        <BsFillVolumeUpFill
          onClick={() => {
            setVolumeOn(false);
            pause();
          }}
        />
      ) : (
        <BsFillVolumeMuteFill
          onClick={() => {
            setVolumeOn(true);
            play();
          }}
        />
      )}
    </IconContext.Provider>
  );
};

export default VolumeButton;
