import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import {
  Movie,
  OMDBResponseOptions,
  OMDBSearchResponse,
} from "../types/omdbTypes";

export const searchOMDBMovies = async (movieTitle: string, page = 1) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=69f8a176&type=movie&s=${movieTitle}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Network Failure");
    }

    const data: OMDBSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`ERROR: ${error}`);
    throw error;
  }
};

export const useOMDBMovieSearch = (debounceDelay = 500) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<Movie[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // only execute api calls when the user stops typing
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (title: string) => {
      if (title.length === 0) {
        setMovies([]);
        setError("");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await searchOMDBMovies(title, page);

        // force error when there are no results, or too many results
        if (response?.Response === OMDBResponseOptions.failed) {
          throw new Error(response.Error);
        }

        setMovies(
          (prevMovies) =>
            prevMovies && [...prevMovies, ...(response?.Search || [])]
        );
        setHasMore(page * 10 < response.totalResults);
        setError("");
      } catch (error) {
        console.error(error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }, debounceDelay),
    [debounceDelay, page]
  );

  useEffect(() => {
    // execute api call when user types
    if (searchTerm.length > 0) {
      debouncedSearch(searchTerm);
    } else {
      setMovies([]);
      setError("");
    }
  }, [searchTerm, page, debouncedSearch]);

  return {
    loading,
    error,
    movies,
    setSearchTerm,
    setPage,
    hasMore,
  };
};
