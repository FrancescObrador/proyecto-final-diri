import React from 'react';
import { Movie } from '../entities/Movie';

interface MovieEntryProps {
    movie: Movie;
}

export const MovieEntry: React.FC<MovieEntryProps> = ({ movie }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                {movie.poster_path ? (
                    <img 
                        // src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        src={movie.poster_path}
                        alt={movie.title}
                    />
                ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-base-200">
                        <span className="text-base-content opacity-50">No image</span>
                    </div>
                )}
            </figure>
            <div className="card-body"></div>
                <h2 className="card-title truncate">
                    {movie.title}
                    <div className="badge badge-secondary">{new Date(movie.release_date).getFullYear()}</div>
                </h2>
                
            </div>
    );
};
