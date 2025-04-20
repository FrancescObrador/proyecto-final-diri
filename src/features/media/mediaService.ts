import { Media, MediaData } from '../../interfaces/Media';
import { MovieList as MediaList } from '../../interfaces/MediaList';
import { Providers } from '../../interfaces/Providers';
import logger from '../../utilities/Logger';

const BASE_URL = 'https://api.themoviedb.org/3';

export class MediaService {
    private currentLanguage = 'en-EN';

    setLanguage(lang: string) {
        this.currentLanguage = lang;
        logger.info(`Language changed to: ${lang}`);
    }

    private async fetchFromAPI(endpoint: string): Promise<any> {
        logger.info(`Fetching from TMDB API [${this.currentLanguage}]`);
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
                try {
                    return mediaData.media_type === 'movie' 
                        ? await this.getMovieDetails(mediaData.id)
                        : await this.getTVDetails(mediaData.id);
                } catch (error) {
                    logger.error(`Error fetching ${mediaData.media_type} ${mediaData.id}:`+ error);
                    return null;
                }
            });

            const results = await Promise.all(mediaPromises);
            return results.filter(media => media !== null) as Media[];
        } catch (error) {
            logger.error('Error in media batch:' + error);
            return [];
        }
    }

    async getMovieDetails(movieId: number): Promise<Media> {
        try {
            const media = await this.fetchFromAPI(
                `/movie/${movieId}?language=${this.currentLanguage}&append_to_response=credits`
            );
            return { 
                ...media,
                media_type: 'movie',
                title: media.title,
                release_date: media.release_date
            };
        } catch (error) {
            logger.error(`Error fetching movie details for ID ${movieId}:`+ error);
            throw error;
        }
    }

    async getTVDetails(tvId: number): Promise<Media> {
        try {
            const media = await this.fetchFromAPI(
                `/tv/${tvId}?language=${this.currentLanguage}&append_to_response=credits`
            );
            return {
                ...media,
                media_type: 'tv',
                name: media.name,
                first_air_date: media.first_air_date
            };
        } catch (error) {
            logger.error(`Error fetching TV details for ID ${tvId}:`+ error);
            throw error;
        }
    }

    async getPopularMedia(page: number = 1): Promise<MediaList> {
        return this.fetchFromAPI(
            `/movie/popular?language=${this.currentLanguage}&page=${page}`
        );
    }

    async getMediaPlatforms(movieId: number): Promise<Providers> {
        return this.fetchFromAPI(
            `/movie/${movieId}/watch/providers?language=${this.currentLanguage}`
        );
    }

    async searchMedia(query: string, page: number = 1): Promise<MediaList> {
        return this.fetchFromAPI(
            `/search/multi?query=${encodeURIComponent(query)}` + 
            `&language=${this.currentLanguage}&page=${page}`
        );
    }

    async getTopRatedMedia(page: number = 1): Promise<MediaList> {
        return this.fetchFromAPI(
            `/movie/top_rated?language=${this.currentLanguage}&page=${page}`
        );
    }

    async getUpcomingMedia(page: number = 1): Promise<MediaList> {
        return this.fetchFromAPI(
            `/movie/upcoming?language=${this.currentLanguage}&page=${page}`
        );
    }

    async getNowPlayingMedia(page: number = 1): Promise<MediaList> {
        return this.fetchFromAPI(
            `/movie/now_playing?language=${this.currentLanguage}&page=${page}`
        );
    }
}

export const mediaService = new MediaService();