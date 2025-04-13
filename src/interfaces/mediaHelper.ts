import { Media, MediaData } from '../interfaces/Media';

// Convertir a timestamp para Firebase
export const convertToMediaData = (
    tmdbMedia: Media,
    seen: boolean = false
): MediaData => {
    return {
        id: tmdbMedia.id,
        seen: seen,
        addedAt: Date.now()
    };
};

// Combinar datos manteniendo el timestamp
export const mergeMediaData = (
    tmdbMedia: Media,
    firebaseData: MediaData
): Media & MediaData => {
    return {
        ...tmdbMedia,
        ...firebaseData,
    };
};

// Convertir timestamp a Date solo cuando sea necesario
export const getAddedDate = (timestamp: number): Date => {
    return new Date(timestamp);
};