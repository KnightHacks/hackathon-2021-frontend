import { useContext } from "react";
import { IconContext } from "react-icons";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { VolumeContext } from "../context/VolumeContext";

const VolumeButton = () => {
  const volume = useContext(VolumeContext);
  console.log(volume);
  return (
    <IconContext.Provider
      value={{
        color: "white",
        className: "text-4xl md:text-5xl cursor-pointer",
      }}
    >
      {volume.state.volumeOn ? (
        <BsFillVolumeUpFill
          onClick={() => {
            volume.dispatch({ type: "pause" });
            volume.state.song.pause();
          }}
        />
      ) : (
        <BsFillVolumeMuteFill
          onClick={() => {
            volume.dispatch({ type: "play" });
            volume.state.song.play();
          }}
        />
      )}
    </IconContext.Provider>
  );
};

export default VolumeButton;
