// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { nextSong, prevSong, playPause } from "../../redux/features/playerSlice";
// import Controls from "./Controls";
// import Player from "./Player";
// import Seekbar from "./Seekbar";
// import Track from "./Track";
// import VolumeBar from "./VolumeBar";

// const MusicPlayer = () => {
//   const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
//     useSelector((state) => state.player);
//   const [duration, setDuration] = useState(0);
//   const [seekTime, setSeekTime] = useState(0);
//   const [volume, setVolume] = useState(0.3);
//   const [repeat, setRepeat] = useState(false);
//   const [shuffle, setShuffle] = useState(false);
//   const dispatch = useDispatch();

//   // Format the duration from milliseconds to MM:SS
//   const formatDuration = (durationInMillis) => {
//     if (durationInMillis === undefined || durationInMillis === null) {
//       return "00:00";
//     }

//     const seconds = Math.floor(durationInMillis / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;

//     const formattedMinutes = String(minutes).padStart(2, "0");
//     const formattedSeconds = String(remainingSeconds).padStart(2, "0");

//     return `${formattedMinutes}:${formattedSeconds}`;
//   };

//   useEffect(() => {
//     if (activeSong) {
//       const durationInMillis = activeSong.attributes?.durationInMillis;
//       setDuration(durationInMillis / 1000); // Set duration in seconds
//     }
//   }, [activeSong]);

//   useEffect(() => {
//     const audio = document.querySelector("audio");
//     if (audio) {
//       // Update seekTime based on currentTime from Player
//       const updateSeekTime = () => {
//         setSeekTime(audio.currentTime);
//       };

//       const intervalId = setInterval(updateSeekTime, 1000);
//       return () => clearInterval(intervalId);
//     }
//   }, [isPlaying]);

//   useEffect(() => {
//     if (isActive) {
//       dispatch(playPause(true));
//     }
//   }, [currentIndex, isActive, dispatch]);

//   const handlePlayPause = () => {
//     if (!isActive) return;
//     dispatch(playPause(!isPlaying));
//   };

//   const handleNextSong = () => {
//     dispatch(playPause(false));
//     if (!shuffle) {
//       dispatch(nextSong((currentIndex + 1) % currentSongs.length));
//     } else {
//       dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
//     }
//   };

//   const handlePrevSong = () => {
//     if (currentIndex === 0) {
//       dispatch(prevSong(currentSongs.length - 1));
//     } else if (shuffle) {
//       dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
//     } else {
//       dispatch(prevSong(currentIndex - 1));
//     }
//   };

//   return (
//     <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
//       <Track
//         isPlaying={isPlaying}
//         isActive={isActive}
//         activeSong={activeSong}
//       />
//       <div className="flex-1 flex flex-col items-center justify-center">
//         <Controls
//           isPlaying={isPlaying}
//           isActive={isActive}
//           repeat={repeat}
//           setRepeat={setRepeat}
//           shuffle={shuffle}
//           setShuffle={setShuffle}
//           currentSongs={currentSongs}
//           handlePlayPause={handlePlayPause}
//           handlePrevSong={handlePrevSong}
//           handleNextSong={handleNextSong}
//         />
//         <Seekbar
//           value={seekTime}
//           min="0"
//           max={duration}
//           onInput={(event) => setSeekTime(event.target.value)}
//           appTime={seekTime} // Updated to use seekTime directly
//           formattedDuration={formatDuration(duration * 1000)}
//         />

//         <Player
//           activeSong={activeSong}
//           volume={volume}
//           isPlaying={isPlaying}
//           seekTime={seekTime}
//           repeat={repeat}
//           currentIndex={currentIndex}
//           onEnded={handleNextSong}
//           onTimeUpdate={(event) => setSeekTime(event.target.currentTime)}
//           onLoadedData={(event) => setDuration(event.target.duration)}
//         />
//       </div>
//       <VolumeBar
//         value={volume}
//         min="0"
//         max="1"
//         onChange={(event) => setVolume(event.target.value)}
//       />
//     </div>
//   );
// };

// export default MusicPlayer;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;