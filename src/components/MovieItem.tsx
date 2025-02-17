import React, { useState } from 'react';
import { Movie } from '../entities/Movie';

interface MovieEntryProps {
    movie: Movie;
}

export const MovieItem: React.FC<MovieEntryProps> = ({ movie }) => {
    const [seen, setSeen] = useState(false)
    const [platform, setPlatform] = useState("Netflix")

    return (
        <div className={`card card-side bg-base-100 shadow-xl mb-4 ${seen ? 'opacity-75' : ''}`}>
            <figure className="w-[200px]">
                <img
                    //src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    src={`${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    className="h-full object-cover"
                />
            </figure>
            <div className="card-body">
                <div className="flex items-center gap-2">
                    <h2 className="card-title">{movie.title}</h2>
                    {seen && (
                        <span className='badge badge-primary'>
                            {new Date().toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-500">
                    Estreno en: {new Date(movie.release_date).toLocaleDateString('es-ES', { year: 'numeric' })}
                </p>
                <div className="card-actions flex-col justify-end">
                    <div className="form-control w-full">
                        <label className="label cursor-pointer justify-start space-x-2">
                            <span className="label-text">Vista</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-sm"
                                checked={seen}
                                onChange={(e) => setSeen(e.target.checked)}
                            />
                        </label>
                    </div>
                    <select
                        className="select select-bordered select-sm w-full"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    >
                        <option disabled value="">Plataforma</option>
                        <option value="Netflix">Netflix</option>
                        <option value="Amazon Prime">Amazon Prime</option>
                        <option value="HBO Max">HBO Max</option>
                        <option value="Disney+">Disney+</option>
                        <option value="Other">Otra</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
