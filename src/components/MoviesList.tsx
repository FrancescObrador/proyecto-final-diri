import { useEffect, useState } from 'react';
import { Media } from '../interfaces/Media';
import { MovieItem } from './MovieItem';
import CenteredLoader from './shared/CenteredLoader';
import { useSelector } from 'react-redux';

const MoviesList = () => {
    const [media, setMedia] = useState<Media[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const updatedList = useSelector((state: any) => state.media.media);

    useEffect(() => {
        if (updatedList) {
            setMedia(updatedList)
            setIsLoading(false)
        }
    }, [updatedList]);

    return (
        <>
            {isLoading ? (
                <CenteredLoader messages={['Writing the scripts...', 'Filming the movies...']}></CenteredLoader>
            ) : media.length === 0 ? (
                <div className="text-center p-4">
                    <p className="text-xl">No movies have been added yet!</p>
                </div>
            ) : (
                <ul className="list bg-base-100 rounded-box shadow-xl m-4">
                    {media.map((media) => (
                        <li key={media.id} className='list-row'>
                            <MovieItem media={media}></MovieItem>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default MoviesList;