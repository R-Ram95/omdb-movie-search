import defaultImg from "../../public/default-poster.jpg";
import { Movie } from "../types/omdbTypes";

interface MovieTileProps {
  movie: Movie;
}

const MovieTile = ({ movie }: MovieTileProps) => {
  return (
    <div className="card bg-base-100 w-96 h-full mx-auto">
      <figure className="px-10 pt-10">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : defaultImg}
          alt="Could not find Poster"
          style={{ height: "300px", objectFit: "cover" }}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center flex flex-col">
        <h2 className="card-title">{movie.Title}</h2>
        <p>{movie.Year}</p>
        <div className="card-actions">
          <button className="btn btn-primary">More Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieTile;
