import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { fetchMedia } from '../features/media/mediaSlice';
import { Media } from '../interfaces/Media';
import { AppDispatch } from '../store/store';
import { MovieItem } from './MovieItem';
import CenteredLoader from './shared/CenteredLoader';


const MoviesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { media, loading, error } = useSelector((state: any) => state.media);

    useEffect(() => {
        dispatch(fetchMedia());
    }, [dispatch]);

    if (loading) {
        return <CenteredLoader messages={['Writing the scripts...', 'Filming the movies...']} />;
    }

    if (error) {
        return (
            <div className="text-center p-4 text-error">
                <FormattedMessage id="error-fetching-media" />
            </div>
        );
    }

    return (
        <>
            {media.length === 0 ? (
                <div className="text-center p-4">
                    <p className="text-xl"><FormattedMessage id='movies-empty' /></p>
                </div>
            ) : (
                <ul className="list bg-base-100 rounded-box shadow-xl m-4">
                    {media.map((mediaItem: Media) => (
                        <li key={mediaItem.id} className='list-row'>
                            <MovieItem media={mediaItem} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default MoviesList;