import { useGetTopChartsQuery } from "../redux/services/shazamcore";
import { ArtistCard, Loader, Error } from "../components";

const TopArtists = () => {
  const countryCode = 'US';
  const { data, isFetching, error } = useGetTopChartsQuery(countryCode);

  if (isFetching) return <Loader title="Loading top charts" />;

  if (error) return <Error message={error?.data?.message || "An error occurred"} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track, index) => (
          <ArtistCard key={`${track.key}-${index}`} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
