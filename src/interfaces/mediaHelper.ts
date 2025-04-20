import { Media, MediaData } from '../interfaces/Media';

export const convertToMediaData = (media: Media): MediaData => {
    return {
        id: media.id,
        seen: false,
        seenAt: null,
        addedAt: Date.now(),
        platform: "Otros",
        media_type: media.media_type!,
    };
};

export const mergeMediaData = (
    tmdbMedia: Media,
    firebaseData: MediaData
): Media & MediaData => {
    return {
        ...tmdbMedia,
        ...firebaseData,
    };
};

export const getAddedDate = (timestamp: number): Date => {
    return new Date(timestamp);
};