// import SongBar from "./SongBar";

// const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => (
//   <div className="flex flex-col">
//     <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
//     <div className="mt-6 w-full flex flex-col">
//       {data?.map((song, i) => {
//         const uniqueKey = `${artistId}-${song.id || song.key || i}`;
//         return (
//           <SongBar
//             key={uniqueKey}
//             song={song}
//             i={i}
//             artistId={artistId}
//             isPlaying={isPlaying}
//             activeSong={activeSong}
//             handlePauseClick={handlePauseClick}
//             handlePlayClick={handlePlayClick}
//           />
//         );
//       })}
//     </div>
//   </div>
// );

// export default RelatedSongs;

import React from 'react';
import SongBar from './SongBar';

const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  // Log the data prop to the console
  console.log('Related Songs Data:', data);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={`${artistId}-${song.key}-${i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
