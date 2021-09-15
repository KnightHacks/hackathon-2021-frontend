import { createContext, useReducer } from "react";
import BackgroundMusic from "../assets/BackgroundMusic.mp3";

export const VolumeContext = createContext();

/**
 * A Reducer function for manipulating multiple pieces of state at once.
 * @param state the current VolumeContext state
 * @param action An object containing a type and payload element.
 * @returns The modified state after the selected action type.
 */
function VolumeReducer(state, action) {
  switch (action.type) {
    case "play": {
      return { ...state, volumeOn: true };
    }
    case "pause": {
      return { ...state, volumeOn: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/**
 * A context provider component that allows global access of volume state from anywhere in the codebase.
 * @param children The Apps JSX content that will be rendered.
 * @returns A context provider component from VolumeContext.
 */
function VolumeProvider({ children }) {
  const song = new Audio(BackgroundMusic);
  song.loop = true;

  const [state, dispatch] = useReducer(VolumeReducer, {
    volumeOn: false,
    song,
  });

  const value = { state, dispatch };
  return (
    <VolumeContext.Provider value={value}>{children}</VolumeContext.Provider>
  );
}

export default VolumeProvider;
