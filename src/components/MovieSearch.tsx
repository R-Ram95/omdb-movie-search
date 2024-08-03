import { useState } from "react";
import { Movie } from "../types/Movie";
import MovieTile from "./MovieTile";
import { useOMDBMovieSearch } from "../hooks/useOMDBMovieSearch";

const MovieSearch = () => {
  const [movies, setMovies] = useState<Movie[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, error, execute: searchMovies } = useOMDBMovieSearch();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const title = e.target.value;
    setSearchTerm(title);
    console.log(searchTerm);
    if (searchTerm.length > 0) {
      const omdbSearchResponse = await searchMovies(title);
      setMovies(omdbSearchResponse?.Search);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <input
        type="text"
        placeholder="Enter Move Title"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => handleSearch(e)}
      />

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xs"></span>
        </div>
      )}

      {error && <div className="alert alert-error mt-4">{error}</div>}

      {!isLoading && !error && (
        <>
          {movies && movies.length > 0 ? (
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-4">
              {movies.map((movie) => (
                <MovieTile key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="mt-4">No Movies Found</div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieSearch;
