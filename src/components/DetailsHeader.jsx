import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  // Extract artist attributes
  const artist = artistData?.attributes;

  // Extract necessary attributes for display
  const artistName = artist?.name;
  const artistArtwork = artist?.artwork?.url?.replace("{w}", "500")?.replace("{h}", "500");
  const artistGenre = artist?.genreNames?.[0];
  const artistBio = artist?.artistBio;
  const songTitle = songData?.title;
  const songCoverArt = songData?.images?.coverart;
  const songSubtitle = songData?.subtitle;
  const songGenre = songData?.genres?.primary;
  const artistAvatar = artistData?.avatar;
  console.log(songData);

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          src={
            artistId
              ? artistAvatar // Using the artistAvatar for the image
              : songCoverArt
          }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          alt="art"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistName : songTitle}
          </p>
          {!artistId && songData?.artists?.[0]?.adamid && (
            <Link to={`/artists/${songData.artists[0].adamid}`}>
              <p className="text-base text-gray-400 mt-2">
                {songSubtitle}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId ? artistGenre : songGenre}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
