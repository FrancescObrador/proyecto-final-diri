import { useState } from 'react';
import { Movie } from '../entities/Movie';

interface MovieItemProps {
    movie: Movie;
}

export const MovieItem = ({ movie }: MovieItemProps) => {
    const [seen, setSeen] = useState(false)
    const [platform, setPlatform] = useState("Otros")
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <>
            {/* column 1 */}
            <div>
                {!imageLoaded && <div className='skeleton w-30 h-45'></div>}
                <img 
                    className={`w-12 md:w-30 rounded-xl transition-all duration-300 ${seen ? 'brightness-50' : ''} ${!imageLoaded ? 'hidden' : ''}`} 
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>

            {/* Column 2 */}
            <div>
                <div className="flex flex-row items-center space-x-2">
                    <h1 className='text text-xs md:text-xl font-semibold'>{movie.title}</h1>
                    {seen && (
                        <span className='hidden md:visible badge badge-accent badge-xxs md:badge-sm'>
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
                <label className="label label-xxs md:label-md cursor-pointer justify-end">
                    <span className="label-text">Vista</span>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={seen}
                        onChange={(e) => setSeen(e.target.checked)}
                    />
                </label>
                <select
                    className="select cursor-pointe md:select-md"
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
