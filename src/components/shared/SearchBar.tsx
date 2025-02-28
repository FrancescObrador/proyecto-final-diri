import React, { useEffect, useState } from 'react'
import { mediaService } from '../../features/media/mediaService';
import { MovieList } from '../../interfaces/MediaList';
import { Media } from '../../interfaces/Media';
import { useDispatch } from 'react-redux';
import { addMedia } from '../../features/media/mediaSlice';
import { useDebounceValue } from 'usehooks-ts';
import logger from '../../utilities/Logger';

export interface SearchResult {
    id: string | number;
    title: string;
}

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Media[]>([])

    const dispatch = useDispatch();

    const [debouncedQuery, setDebouncedQuery] = useDebounceValue<string>('', 300);

    useEffect(() => {
        const fetch = async () => {
            if (debouncedQuery) {
                try {
                    const response: MovieList = await mediaService.searchMedia(debouncedQuery)
                    setResults(response.results)
                } catch (error) {
                    logger.error('Error searching:' + debouncedQuery)
                    setResults([])
                }
            } else {
                setResults([])
            }
        }
        fetch();
    }, [debouncedQuery])

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value);
        setDebouncedQuery(value);
    }

    const handleResult = async (id: number, mediaType: string) => {

        let media: Media = (mediaType === 'tv') ? await mediaService.getTVDetails(id)
            : await mediaService.getMovieDetails(id);

        dispatch(addMedia(media))

        setResults([]);
        setQuery('');
    }

    const handleBlur = () => {
        setResults([]);
        setQuery('');
    }

    return (
        <div className="form-control relative">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                onBlur={handleBlur}
                placeholder="Search"
                className="input input-bordered w-auto md:w-128"
            />
            {results.length > 0 && (
                <ul className="absolute top-full mt-1 w-full bg-base-100 border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {results.map((result) => (
                        ((result.title || result.name) && result.release_date || result.first_air_date) && (<li
                            key={result.id}
                            onMouseDown={() => handleResult(result.id, result.media_type!)}
                            className="flex flex-row items-center p-2 space-x-2 hover:bg-base-200 cursor-pointer"
                        >
                            <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} className='w-10 h-15' />
                            <p>
                                {result.media_type === 'tv' ? (
                                    `${result.name} - ${new Date(result.first_air_date!).toLocaleDateString('es-ES', { year: 'numeric' })}`
                                ) : (
                                    `${result.title} - ${new Date(result.release_date!).toLocaleDateString('es-ES', { year: 'numeric' })}`
                                )}
                            </p>
                        </li>)
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar;