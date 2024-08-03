import { useState } from "react";
import { Movie } from "../types/Movie";

interface SearchArgs {
  movieTitle: string;
  page?: number;
}

interface OMDBSearchResponse {
  Response: OMDBResponseOptions;
  Error: string;
  Search: Movie[];
  TotalResponse: number;
}

enum OMDBResponseOptions {
  success = "True",
  failed = "False",
}

export const searchOMDBMovies = async ({
  movieTitle,
  page = 1,
}: SearchArgs) => {
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
    console.error(`ERROR: ${error} `);
  }
};

export const useOMDBMovieSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const execute = async (movieTitle: string, page = 1) => {
    try {
      setIsLoading(true);
      const response = await searchOMDBMovies({
        movieTitle,
        page,
      });

      if (response?.Response === OMDBResponseOptions.failed) {
        throw new Error(response.Error);
      }
      setError("");

      return response;
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, execute };
};
