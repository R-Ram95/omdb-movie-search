import MovieTile from "./MovieTile";
import { useOMDBMovieSearch } from "../hooks/useOMDBMovieSearch";

const MovieSearch = () => {
  const { loading, error, movies, setSearchTerm, page, setPage, totalResults } =
    useOMDBMovieSearch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setPage(1);
    setSearchTerm(title);
  };

  const handleNextPage = () => {
    if (page * 10 < totalResults) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter Movie Title"
          className="input input-bordered w-full pl-10 pr-3"
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xs"></span>
        </div>
      )}

      {error && <div className="alert alert-error mt-4">{error}</div>}

      {!loading && !error && (
        <>
          {movies && movies.length > 0 ? (
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-4">
              {movies.map((movie) => (
                <MovieTile key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="mt-4">Search a movie!</div>
          )}
        </>
      )}

      {!loading && !error && movies && movies.length > 0 && (
        <div className="join grid grid-cols-2 mb-5">
          <button
            className="join-item btn btn-outline"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous page
          </button>
          <button
            className="join-item btn btn-outline"
            onClick={handleNextPage}
            disabled={page * 10 > totalResults}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
