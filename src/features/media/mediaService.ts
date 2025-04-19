import { Media, MediaData } from '../../interfaces/Media';
import { MovieList as MediaList } from '../../interfaces/MediaList';
import { Providers } from '../../interfaces/Providers';
import logger from '../../utilities/Logger';

const BASE_URL = 'https://api.themoviedb.org/3';

export class MediaService {
    private async fetchFromAPI(endpoint: string): Promise<any> {
        logger.info('Fetching from TMDB API');
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN
            }
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            logger.error('Error fetching from TMDB API:' + error);
            throw error;
        }
    }

    async getMediaBatch(mediaDataList: MediaData[]): Promise<Media[]> {
        try {
            const mediaPromises = mediaDataList.map(async (mediaData) => {
                console.log(`fetching ${mediaData.id} that is ${mediaData.media_type} `)
                if (mediaData.media_type === 'movie') {
                    return this.getMovieDetails(mediaData.id);
                } else {
                    return this.getTVDetails(mediaData.id);
                }
            });

            const results = await Promise.all(mediaPromises);
            return results.filter(media => media !== null) as Media[];
        } catch (error) {
            logger.error('Error fetching media batch:' + error);
            throw new Error('Failed to fetch media batch');
        }
    }

    async getMovieDetails(movieId: number): Promise<Media> {
        try {
            const media = await this.fetchFromAPI(`/movie/${movieId}?language=es-ES`);
            return { 
                ...media,
                media_type: 'movie',
                title: media.title,
                release_date: media.release_date
            };
        } catch (error) {
            logger.error(`Error fetching movie details for ID ${movieId}:` + error);
            throw error;
        }
    }

    async getTVDetails(tvId: number): Promise<Media> {
        try {
            const media = await this.fetchFromAPI(`/tv/${tvId}?language=es-ES`);
            return {
                ...media,
                media_type: 'tv',
                name: media.name,
                first_air_date: media.first_air_date
            };
        } catch (error) {
            logger.error(`Error fetching TV details for ID ${tvId}:` + error);
            throw error;
        }
    }

    async getPopularMedia(page: number = 1): Promise<MediaList> {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        return await this.fetchFromAPI(`/movie/popular?language=es-ES&page=${page}`);
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