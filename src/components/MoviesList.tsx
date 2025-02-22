import { useEffect, useState } from 'react';
import { Movie } from '../entities/Movie';
import { moviesService } from '../features/movies/moviesService';
import { MovieItem } from './MovieItem';

const MoviesList = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true)
                const response = await moviesService.getPopularMovies()
                setMovies(response.results)
            } catch (error) {
                console.error('Error fetching movies:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovies()
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col justify-center items-center min-h-screen space-y-2">
                    <div className="loading loading-lg text-primary" />
                    <h1>Loading movies...</h1>
                </div>
            ) : (
                <ul className="list bg-base-100 rounded-box shadow-xl m-4">
                    {movies.map((movie, index) => (
                        <li key={index} className='list-row'>
                            <MovieItem movie={movie}></MovieItem>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default MoviesList;