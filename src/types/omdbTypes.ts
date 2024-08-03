export interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

export interface OMDBSearchResponse {
  Response: OMDBResponseOptions;
  Error: string;
  Search: Movie[];
  totalResults: number;
}

export enum OMDBResponseOptions {
  success = "True",
  failed = "False",
}
