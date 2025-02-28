import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media } from '../../interfaces/Media';

export interface MediaState {
    media: Media[];
    loading: boolean;
    error: string | null;
    selectedMedia: Media | null;
    filters: {
        searchQuery: string;
        genre: string;
    };
}

const initialState: MediaState = {
    media: [],
    loading: false,
    error: null,
    selectedMedia: null,
    filters: {
        searchQuery: '',
        genre: '',
    },
};

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setMedia: (state, action: PayloadAction<Media[]>) => {
            state.media = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addMedia: (state, action: PayloadAction<Media>) => {
            state.media.push(action.payload);
        },
        removeMedia: (state, action: PayloadAction<number>) => {
            state.media = state.media.filter(media => media.id !== action.payload);
        },
        updateMedia: (state, action: PayloadAction<Media>) => {
            const index = state.media.findIndex(media => media.id === action.payload.id);
            if (index !== -1) {
                state.media[index] = action.payload;
            }
        },
        setSelectedMedia: (state, action: PayloadAction<Media | null>) => {
            state.selectedMedia = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.filters.searchQuery = action.payload;
        },
        setGenreFilter: (state, action: PayloadAction<string>) => {
            state.filters.genre = action.payload;
        },
    },
});

export const {
    setMedia,
    setLoading,
    setError,
    addMedia,
    removeMedia,
    updateMedia,
    setSelectedMedia,
    setSearchQuery,
    setGenreFilter,
} = mediaSlice.actions;

export default mediaSlice.reducer;