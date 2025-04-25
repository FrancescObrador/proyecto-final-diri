import { memo, useContext, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { fetchMedia } from '../features/media/mediaSlice';
import { AppDispatch } from '../store/store';
import MovieItem from './MovieItem';
import CenteredLoader from './shared/CenteredLoader';
import { LanguageContext } from './Providers/LanguageContext';

const MoviesList = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const { media, loading, error } = useSelector(
        (state: any) => ({
            media: state.media.media,
            loading: state.media.loading,
            error: state.media.error
        }),
        shallowEqual
    );
    const { locale } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(fetchMedia());
    }, [dispatch, locale]);

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
                    {media.map((mediaItem: any) => (
                        <li key={`${mediaItem.id}-${mediaItem.media_type}`} className='list-row'>
                            <MovieItem media={mediaItem} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
});

export default MoviesList;