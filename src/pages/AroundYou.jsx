import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetAroundYouSongsQuery } from '../redux/services/shazamGeoApi';
import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetAroundYouSongsQuery(country, {
    skip: !country,
  });

  useEffect(() => {
    axios
      .get('https://geo.ipify.org/api/v2/country?apiKey=at_rjq8zvsD9v9umxIGXjMx2YtX003wi')
      .then((res) => {
        const fetchedCountry = res?.data?.location?.country || 'US';
        setCountry(fetchedCountry);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if ((isFetching || loading) && !data) return <Loader title="Loading songs around you" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data.tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
