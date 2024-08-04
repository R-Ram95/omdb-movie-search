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
      <label className="input input-bordered input-primary flex items-center gap-2 pl-10 pr-3">
        <input
          type="text"
          placeholder="Enter Movie Title"
          className=""
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xs"></span>
        </div>
      )}

      {error && <div className="mt-10 alert alert-error">{error}</div>}

      {!loading && !error && (
        <>
          {movies && movies.length > 0 ? (
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full p-4">
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
            className="join-item btn btn-outline btn-secondary"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous page
          </button>
          <button
            className="join-item btn btn-outline btn-secondary"
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
