import { useState } from 'react';
import { Media } from '../interfaces/Media';
import { FormattedMessage } from 'react-intl';

interface MovieItemProps {
    media: Media;
}

export const MovieItem = ({ media }: MovieItemProps) => {
    const [seen, setSeen] = useState(false)
    const [platform, setPlatform] = useState("Otros")
    const [imageLoaded, setImageLoaded] = useState(false)

    const title = media.media_type === 'tv' ? media.name : media.title;
    const releaseYear = media.media_type === 'tv' 
        ? new Date(media.first_air_date!).toLocaleDateString('es-ES', { year: 'numeric' })
        : new Date(media.release_date!).toLocaleDateString('es-ES', { year: 'numeric' });
    
    const currentDate = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <>
            {/* column 1 */}
            <div>
                {!imageLoaded && <div className='skeleton w-12 md:w-22'></div>}
                <img
                    className={`w-12 md:w-22 rounded-xl transition-all duration-300 ${seen ? 'brightness-50' : ''} ${!imageLoaded ? 'hidden' : ''}`}
                    src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>

            {/* Column 2 */}
            <div className='space-y-1'>
                {/* Row title  */}
                <div className="flex flex-row items-center space-x-2">
                    <h1 className='text text-xs md:text-xl font-semibold truncate'>
                        {title}
                    </h1>
                    {seen && (
                        <span className='invisible md:visible badge badge-accent badge-xs md:badge-sm'>
                            {currentDate}
                        </span>
                    )}
                </div>
                {/* Row release date */}
                <div className="text uppercase font-semibold opacity-60">
                    <div className="flex gap-2">
                        {releaseYear}
                    </div>
                </div>
                {/* Row vote average */}
                <div className="text uppercase font-semibold opacity-60">{media.vote_average.toFixed(1)} ⭐</div>
                {/* Row genres */}
                <div className='hidden md:flex space-x-1'>
                    {media.genres!.map((genre, index) => (
                        <div key={index} className='badge badge-sm badge-outline badge-secondary'>{genre.name}</div>
                    ))}
                </div>
            </div>

            {/* column 3 */}
            <div className="flex flex-col space-y-4">
                <label className="swap swap-rotate label-xs md:label-md cursor-pointer justify-end">
                    <input
                        type="checkbox"
                        onChange={(e) => setSeen(e.target.checked)}
                    />

                    <svg xmlns="http://www.w3.org/2000/svg" className="swap-on size-8 fill-current" viewBox="0 -960 960 960"  fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="swap-off size-8 fill-current" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

                </label>
                <select
                    className={`select cursor-pointer select-xs md:select-md w-22 md:w-auto ${seen ? 'flex' : 'hidden'}`}
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                >
                    <option disabled value=""><FormattedMessage id='platform' /></option>
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
