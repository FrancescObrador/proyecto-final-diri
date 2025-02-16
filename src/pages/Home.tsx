import { ElementList } from "../components/ElementList"
import { MovieEntry } from "../components/MovieEntry"
import { useEffect, useState } from "react"
import { Movie } from "../entities/Movie"
import { moviesService } from "../features/movies/moviesService"

export const Home = () => {
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
                <span>Loading...</span>
            ) : (
                <ElementList 
                    items={movies}
                    renderItem={(movie) => <MovieEntry movie={movie} />}
                />
            )}
        </>
    )
}