import React, { useState } from 'react';
import { Movie } from '../entities/Movie';

interface MovieEntryProps {
    movie: Movie;
}

export const MovieItem: React.FC<MovieEntryProps> = ({ movie }) => {
    const [seen, setSeen] = useState(false)
    const [platform, setPlatform] = useState("Netflix")

    return (
        <div className={'card card-side bg-base-100 shadow-xl mb-4'}>
            <figure className="w-[100px] h-[150px]">
                <img
                    //src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    src = {movie.poster_path!}
                    alt={`${movie.title} poster`}
                    className={`h-full object-cover ${seen ? 'brightness-50' : ''}`}
                />
            </figure>
            <div className="card-body p-4">
                <div className="flex items-start justify-between w-full gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="card-title text-lg">{movie.title}</h2>
                        <div className="text-sm text-gray-500">
                            {new Date(movie.release_date).toLocaleDateString('es-ES', { year: 'numeric' })}
                        </div>
                        {seen && (
                            <span className='badge badge-accent'>
                                {new Date().toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="form-control gap-2">
                            <label className="label cursor-pointer justify-end space-x-2">
                                <span className="label-text">Vista</span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-sm"
                                    checked={seen}
                                    onChange={(e) => setSeen(e.target.checked)}
                                />
                            </label>
                            <select
                                    className="select select-bordered select-sm"
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                    style={{ visibility: seen ? 'visible' : 'hidden' }}
                                >
                                    <option disabled value="">Plataforma</option>
                                    <option value="Netflix">Netflix</option>
                                    <option value="Amazon Prime">Amazon Prime</option>
                                    <option value="HBO Max">HBO Max</option>
                                    <option value="Disney+">Disney+</option>
                                    <option value="Cine">Cine</option>
                                    <option value="Other">Otra</option>
                                </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
