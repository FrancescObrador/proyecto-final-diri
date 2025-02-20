import React, { useState } from 'react';
import { Movie } from '../entities/Movie';

interface MovieEntryProps {
    movie: Movie;
}

export const MovieItem: React.FC<MovieEntryProps> = ({ movie }) => {
    const [seen, setSeen] = useState(false)
    const [platform, setPlatform] = useState("Netflix")

    return (
        <>
            <div>
                <img className="size-10" src={`${movie.poster_path}`} />
            </div>
            <div className="list-col">
                <div>Dio Lupa</div>
                <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
            </div>

        </>
    );
};
