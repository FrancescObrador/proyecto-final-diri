import { Movie, MovieDetail } from '../../entities/Movie';
import { MovieList } from '../../entities/MovieList';
import { MOVIE } from './MOVIE';

const BASE_URL = 'https://api.themoviedb.org/3';

export class MoviesService {
    

    private async fetchFromAPI(endpoint: string): Promise<any> {
        let options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN
            }
          };

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(options.headers.Authorization)
        return await response.json();
    }

    async getPopularMovies(page: number = 1): Promise<MovieList> {
        //await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay
        
        let mv: MovieList = {
            page: 1,
            total_pages: 10,
            total_results: 10,
            results: MOVIE
        };
        
        //return await this.fetchFromAPI(`/movie/popular?language=es-ES&page=${page}`);
        return mv;
    }

    async getMovieDetails(movieId: number): Promise<MovieDetail> {
        return await this.fetchFromAPI(`/movie/${movieId}`);
    }

    async searchMovies(query: string, page: number = 1): Promise<MovieList> {
        return await this.fetchFromAPI(`/search/movie&query=${encodeURIComponent(query)}&page=${page}`);
    }

    async getTopRatedMovies(page: number = 1): Promise<MovieList> {
        return await this.fetchFromAPI(`/movie/top_rated&page=${page}`);
    }

    async getUpcomingMovies(page: number = 1): Promise<MovieList> {
        return await this.fetchFromAPI(`/movie/upcoming&page=${page}`);
    }

    async getNowPlayingMovies(page: number = 1): Promise<MovieList> {
        return await this.fetchFromAPI(`/movie/now_playing&page=${page}`);
    }
}

export const moviesService = new MoviesService();