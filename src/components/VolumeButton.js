import { useContext } from "react";
import { IconContext } from "react-icons";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { VolumeContext } from "../context/VolumeContext";
import { ThemeSwitch } from "../context/ThemeSwitch";

const VolumeButton = () => {
  const volume = useContext(VolumeContext);
  const { theme, setTheme } = useContext(ThemeSwitch);

  return (
    <IconContext.Provider
      value={{
        className:
          "text-4xl md:text-5xl cursor-pointer text-darkblue dark:text-purewhite",
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
