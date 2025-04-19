import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, MediaData } from '../../interfaces/Media';
import { firebaseDatabaseService } from '../../services/FirebaseDatabaseService';
import { auth } from '../../services/FireBase';
import { convertToMediaData } from '../../interfaces/mediaHelper';
import { mediaService } from './mediaService';

// Tipo combinado para el estado (timestamp en lugar de Date)
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

export const addMedia = createAsyncThunk(
    'media/addMedia',
    async (tmdbMedia: Media, { rejectWithValue }) => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error('User not authenticated');
            
            const mediaData = convertToMediaData(tmdbMedia);
            await firebaseDatabaseService.AddMedia(uid, mediaData);
            
            return {
                ...tmdbMedia,
                ...mediaData
            } as CombinedMedia;
            
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to add media');
        }
    }
);

export const removeMedia = createAsyncThunk(
    'media/removeMedia',
    async (mediaId: number, { rejectWithValue }) => {
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
    async (mediaData: MediaData, { rejectWithValue, getState }) => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error('User not authenticated');
            
            await firebaseDatabaseService.UpdateMedia(uid, mediaData);
            
            const state = getState() as { media: MediaState };
            const existingMedia = state.media.media.find(m => m.id === mediaData.id);
            
            return {
                ...(existingMedia || {}),
                ...mediaData
            } as CombinedMedia;
            
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
    reducers: {},
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
                state.media = state.media.filter((media: { id: number; }) => media.id !== action.payload);
                state.loading = false;
            })
            .addCase(removeMedia.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateMedia.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMedia.fulfilled, (state, action: PayloadAction<CombinedMedia>) => {
                const index = state.media.findIndex((media: { id: any; }) => media.id === action.payload.id);
                if (index !== -1) {
                    state.media[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateMedia.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default mediaSlice.reducer;