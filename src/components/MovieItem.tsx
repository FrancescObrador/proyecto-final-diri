import { useState } from 'react';
import { Media } from '../interfaces/Media';
import { FormattedMessage, FormattedRelativeTime } from 'react-intl';

interface MovieItemProps {
    media: Media;
}

export const MovieItem = ({ media: media }: MovieItemProps) => {
    const [seen, setSeen] = useState(false)
    const [platform, setPlatform] = useState("Otros")
    const [imageLoaded, setImageLoaded] = useState(false)

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
            <div>
                <div className="flex flex-row items-center space-x-2 space-y-1">
                    <h1 className='text text-xs md:text-xl font-semibold'>
                        {media.media_type === 'tv' ? media.name : media.title}
                    </h1>
                    {seen && (
                        <span className='invisible md:visible badge badge-accent badge-xxs md:badge-sm'>
                            {new Date().toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </span>
                    )}
                </div>
                <div className="text uppercase font-semibold opacity-60">
                    <div className="flex gap-2">
                        {
                            media.media_type === 'tv'
                                ? new Date(media.first_air_date!).toLocaleDateString('es-ES', { year: 'numeric' })
                                : new Date(media.release_date!).toLocaleDateString('es-ES', { year: 'numeric' })
                        }
                    </div>
                </div>
                <div className="text uppercase font-semibold opacity-60">{media.vote_average.toFixed(1)} ⭐</div>
                <div className='space-x-1'>
                    {media.genres!.map((genre, index) => (
                        <div key={index} className='badge badge-sm badge-outline badge-secondary'>{genre.name}</div>
                    ))}
                </div>
            </div>

            {/* column 3 */}
            <div className="flex flex-col space-y-4">
                <label className="label label-xs md:label-md cursor-pointer justify-end">
                    <span className="label-text"><FormattedMessage id='seen' /></span>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={seen}
                        onChange={(e) => setSeen(e.target.checked)}
                    />
                </label>
                <select
                    className={`select cursor-pointe md:select-md ${seen ? 'flex' : 'hidden'}`}
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
