import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => {
  const formatDuration = (durationInMillis) => {
    if (durationInMillis === undefined || durationInMillis === null) {
      return '00:00';
    }

    // Convert milliseconds to seconds
    const seconds = Math.floor(durationInMillis / 1000);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format minutes and seconds to always be two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Format the duration from the current song
  const durationInMillis = currentSongs[0]?.attributes?.durationInMillis;
  const formattedDuration = formatDuration(durationInMillis);

  const handlePlayPauseClick = () => {
    handlePlayPause();
    if (!isPlaying) {
      console.log('Duration:', formattedDuration);
    }
  };

  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat
        size={20}
        color={repeat ? "red" : "white"}
        onClick={() => setRepeat((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
      <MdSkipPrevious
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handlePrevSong}
      />
      {isPlaying ? (
        <BsFillPauseFill
          size={45}
          color="#FFF"
          onClick={handlePlayPauseClick}
          className="cursor-pointer"
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#FFF"
          onClick={handlePlayPauseClick}
          className="cursor-pointer"
        />
      )}
      <MdSkipNext
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handleNextSong}
      />
      <BsShuffle
        size={20}
        color={shuffle ? "red" : "white"}
        onClick={() => setShuffle((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
    </div>
  );
};

export default Controls;
