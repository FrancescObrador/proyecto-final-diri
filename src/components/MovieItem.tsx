import React, { useState } from 'react';
import { Movie } from '../entities/Movie';

interface MovieEntryProps {
    movie: Movie;
}

export const MovieItem: React.FC<MovieEntryProps> = ({ movie }) => {
    const [seen, setSeen] = useState(false)
    const [platform, setPlatform] = useState("Otros")

    return (
        <>
            {/* column 1 */}
            <div>
                {/* <img className={`w-30 rounded-xl ${seen ? 'brightness-50' : ''}`} src={`${movie.poster_path}`} /> */}
                <img className={`w-30 rounded-xl ${seen ? 'brightness-50' : ''}`} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
            </div>

            {/* Column 2 */}
            <div>
                <div className="flex flex-row items-center space-x-2">
                    <div className='text-xl font-semibold'>{movie.title}</div>

                    {seen && (
                        <span className='badge badge-accent badge-sm'>
                            {new Date().toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </span>
                    )}
                </div>
                <div className="text uppercase font-semibold opacity-60">{new Date(movie.release_date).toLocaleDateString('es-ES', { year: 'numeric' })}</div>
                <div className="text uppercase font-semibold opacity-60">{movie.vote_average} ⭐</div>
            </div>

            {/* column 3 */}
            <div className="flex flex-col space-y-4">
                <label className="label cursor-pointer justify-end">
                    <span className="label-text">Vista</span>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={seen}
                        onChange={(e) => setSeen(e.target.checked)}
                    />
                </label>
                <select
                    className="select cursor-pointer"
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

        </>
    );
};
