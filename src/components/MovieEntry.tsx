import React from 'react';
import { Movie } from '../entities/Movie';

interface MovieEntryProps {
    movie: Movie;
}

export const MovieEntry: React.FC<MovieEntryProps> = ({ movie }) => {
    return (
        <div>
            <figure>
                {movie.poster_path ? (
                    <img
                    // src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        src={movie.poster_path}
                        alt={movie.title}
                    />
                ) : (
                    <div>
                        <span>No image</span>
                    </div>
                )}
            </figure>
            <div>
                <h2>
                    {movie.title}
                    <p>{new Date(movie.release_date).getFullYear()}</p>
                </h2>
            </div>
        </div>
    );
};
