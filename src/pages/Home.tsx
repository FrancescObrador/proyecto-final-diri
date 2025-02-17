import { ElementList } from "../components/ElementList"
import { MovieItem } from "../components/MovieItem"
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
                const response = await moviesService.getFakeMovies()
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
                <div className="flex justify-center items-center min-h-screen">
                    <div className="loading loading-lg text-primary" />
                </div>
            ) : (
                <ElementList
                    items={movies}
                    renderItem={(movie) => <MovieItem movie={movie} />}
                />
            )}
        </>
    )
}