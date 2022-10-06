import { useSelector } from "react-redux";
import { useGetSongsBySearchQuery } from "../redux/services/shazamcore";
import { Error, Loader, SongCard } from "../components";
import { useParams } from "react-router-dom";


const Search = () => {
    const { SearchTerm } = useParams();
    const { activeSong, isPlaying } = useSelector((state) =>state.player);
    const { data, isFetching, error } = useGetSongsBySearchQuery(SearchTerm);
    const songs = data?.tracks?.hits?.map((song) => song.track);

     if (isFetching ) return <Loader title="Loading top charts" />

     if (error ) return <Error/>
return(
<div className="flex flex-col">
    <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Showing results for <span className="font-black">{SearchTerm}</span></h2>
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song,i) =>(
            <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
            />
        ))}
    </div>
</div>
)
};

export default Search;

