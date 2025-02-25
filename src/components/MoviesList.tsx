import { useEffect, useState } from 'react';
import { Media } from '../interfaces/Media';
import { MovieItem } from './MovieItem';
import CenteredLoader from './shared/CenteredLoader';
import { useSelector } from 'react-redux';

const MoviesList = () => {
    const [media, setMedia] = useState<Media[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const mediaFromRedux = useSelector((state: any) => state.media.media);

    useEffect(() => {
        if (mediaFromRedux) {
            setMedia(mediaFromRedux)
            setIsLoading(false)
        }
    }, [mediaFromRedux]);

    return (
        <>
            {isLoading ? (
               <CenteredLoader messages={['Writing the scripts...', 'Filming the movies...']}></CenteredLoader>
            ) : (
                <ul className="list bg-base-100 rounded-box shadow-xl m-4">
                    {media.map((media, index) => (
                        <li key={index} className='list-row'>
                            <MovieItem media={media}></MovieItem>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default MoviesList;