import { Media } from '../../interfaces/Media';
import { MovieList as MediaList } from '../../interfaces/MediaList';
import { Providers } from '../../interfaces/Providers';
import { MOVIE } from './MOVIE';

const BASE_URL = 'https://api.themoviedb.org/3';

export class MediaService {
    

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
        return await response.json();
    }

    async getPopularMedia(page: number = 1): Promise<MediaList> {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        return await this.fetchFromAPI(`/movie/popular?language=es-ES&page=${page}`);
    }

    async getFakeMovies(): Promise<MediaList> {
        //await new Promise(resolve => setTimeout(resolve, 2000)); 
         
         let mv: MediaList = {
             page: 1,
             total_pages: 10,
             total_results: 10,
             results: MOVIE
         };
         
         return mv;
     }

    async getMovieDetails(movieId: number): Promise<Media> {
        let media = await this.fetchFromAPI(`/movie/${movieId}?language=es-ES`);
        media = {...media, media_type: 'movie'}
        return media;
    }

    async getTVDetails(movieId: number): Promise<Media> {
        let media = await this.fetchFromAPI(`/tv/${movieId}?language=es-ES`);
        media = {...media, media_type: 'tv'}
        return media;
    }

    async getMediaPlatforms(movieId: number): Promise<Providers> {
        return await this.fetchFromAPI(`/movie/${movieId}/watch/providers`);
    }

    async searchMedia(query: string, page: number = 1): Promise<MediaList> {
        return await this.fetchFromAPI(`/search/multi?query=${encodeURIComponent(query)}&language=es-ES&page=${page}`);
    }

    async getTopRatedMeia(page: number = 1): Promise<MediaList> {
        return await this.fetchFromAPI(`/movie/top_rated&page=${page}`);
    }

    async getUpcomingMedia(page: number = 1): Promise<MediaList> {
        return await this.fetchFromAPI(`/movie/upcoming&page=${page}`);
    }

    async getNowPlayingMedia(page: number = 1): Promise<MediaList> {
        return await this.fetchFromAPI(`/movie/now_playing&page=${page}`);
    }
}

export const mediaService = new MediaService();