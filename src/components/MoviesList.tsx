import { useEffect, useState } from 'react';
import { Media } from '../entities/Media';
import { MovieItem } from './MovieItem';
import CenteredLoader from './shared/CenteredLoader';
import { useSelector } from 'react-redux';
import { MediaState } from '../features/media/mediaSlice';

const MoviesList = () => {
    const [media, setMedia] = useState<Media[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const _media  = useSelector((state: MediaState) => state.media);

    useEffect(() => {
        console.log(_media)
        if (_media.length>1) {
            setMedia(_media)
            setIsLoading(false)
        }
    }, [media]);

    return (
        <>
            {isLoading ? (
               <CenteredLoader messages={['Writing the scripts...', 'Filming the movies...']}></CenteredLoader>
            ) : (
                <ul className="list bg-base-100 rounded-box shadow-xl m-4">
                    {media.map((media, index) => (
                        <li key={index} className='list-row'>
                            <MovieItem movie={media}></MovieItem>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default MoviesList;