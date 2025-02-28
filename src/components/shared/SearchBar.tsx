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

const getMediaTitle = (media: Media): string => media.title || media.name || '';
const getMediaDate = (media: Media): string => media.release_date || media.first_air_date || '';
const getPosterUrl = (path: string) => `https://image.tmdb.org/t/p/w200${path}`;

const formatYear = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric' });

const isValidResult = (media: Media) => !!getMediaTitle(media) && !!getMediaDate(media);

const getMediaDisplayText = (media: Media): string => {
    const title = getMediaTitle(media);
    const date = getMediaDate(media);
    return `${title} - ${formatYear(date)}`;
};

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Media[]>([])
    const dispatch = useDispatch();
    const [debouncedQuery, setDebouncedQuery] = useDebounceValue<string>('', 300);

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery) return setResults([]);

            try {
                const response: MovieList = await mediaService.searchMedia(debouncedQuery);
                setResults(response.results.filter(isValidResult));
            } catch (error) {
                logger.error('Error searching:' + debouncedQuery);
                setResults([]);
            }
        }
        fetchResults();
    }, [debouncedQuery])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setDebouncedQuery(e.target.value);
    }

    const handleResult = async (id: number, mediaType: string) => {
        const getDetails = mediaType === 'tv'
            ? mediaService.getTVDetails
            : mediaService.getMovieDetails;

        const media = await getDetails(id);
        dispatch(addMedia(media));

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
                        <li
                            key={result.id}
                            onMouseDown={() => handleResult(result.id, result.media_type!)}
                            className="flex flex-row items-center p-2 space-x-2 hover:bg-base-200 cursor-pointer"
                        >
                            <img
                                src={getPosterUrl(result.poster_path!)}
                                className="w-10 h-15"
                                alt={getMediaTitle(result)}
                            />
                            <p>{getMediaDisplayText(result)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar;