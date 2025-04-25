import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, MediaData } from '../../interfaces/Media';
import { firebaseDatabaseService } from '../../services/FirebaseDatabaseService';
import { auth } from '../../services/FireBase';
import { convertToMediaData } from '../../interfaces/mediaHelper';
import { mediaService } from './mediaService';

// Definición mejorada de CombinedMedia
type CombinedMedia = Media & MediaData;

export interface MediaState {
    media: CombinedMedia[];
    loading: boolean;
    error: string | null;
}

const initialState: MediaState = {
    media: [],
    loading: false,
    error: null,
};

// Thunk para añadir media
export const addMedia = createAsyncThunk<CombinedMedia, Media>(
    'media/addMedia',
    async (tmdbMedia, { rejectWithValue }) => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error('User not authenticated');

            const mediaData = convertToMediaData(tmdbMedia);
            await firebaseDatabaseService.AddMedia(uid, mediaData);

            return {
                ...tmdbMedia,
                ...mediaData
            };

        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to add media');
        }
    }
);

// Thunk para eliminar media
export const removeMedia = createAsyncThunk<number, number>(
    'media/removeMedia',
    async (mediaId, { rejectWithValue }) => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error('User not authenticated');
            await firebaseDatabaseService.RemoveMedia(uid, mediaId);
            return mediaId;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to remove media');
        }
    }
);

export const updateMedia = createAsyncThunk(
    'media/updateMedia',
    async (mediaData: MediaData, { rejectWithValue }) => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error('User not authenticated');
            
            await firebaseDatabaseService.UpdateMedia(uid, mediaData);
            
            return {
                id: mediaData.id,
                updates: {
                    seen: mediaData.seen,
                    seenAt: mediaData.seenAt || null,
                    platform: mediaData.platform || 'Otros'
                }
            };
            
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMedia = createAsyncThunk(
    'media/fetchMedia',
    async (_, { rejectWithValue }) => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error('User not authenticated');

            const mediaDataList = await firebaseDatabaseService.GetAllMedia(uid);
            const tmdbMediaList = await mediaService.getMediaBatch(mediaDataList);

            return mediaDataList.map((mediaData, index) => ({
                ...tmdbMediaList[index],
                ...mediaData
            }));

        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        resetMedia: (state) => {
            state.media = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedia.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMedia.fulfilled, (state, action: PayloadAction<CombinedMedia[]>) => {
                state.media = action.payload;
                state.loading = false;
            })
            .addCase(fetchMedia.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add Media
            .addCase(addMedia.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMedia.fulfilled, (state, action: PayloadAction<CombinedMedia>) => {
                state.media.push(action.payload);
                state.loading = false;
            })
            .addCase(addMedia.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeMedia.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeMedia.fulfilled, (state, action: PayloadAction<number>) => {
                state.media = state.media.filter(media => media.id !== action.payload);
                state.loading = false;
            })
            .addCase(removeMedia.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateMedia.fulfilled, (state, action) => {
                const index = state.media.findIndex(m => m.id === action.payload.id);
                if (index !== -1) {
                    state.media[index] = {
                        ...state.media[index],
                        ...action.payload.updates
                    };
                }
                state.loading = false;
            })
    }
});

export const { resetMedia } = mediaSlice.actions;
export default mediaSlice.reducer;