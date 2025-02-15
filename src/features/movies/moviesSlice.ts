import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../entities/Movie';

interface MoviesState {
    items: Movie[];
    loading: boolean;
    error: string | null;
}

const initialState: MoviesState = {
    items: [],
    loading: false,
    error: null,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.items = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setMovies, setLoading, setError } = moviesSlice.actions;
export default moviesSlice.reducer;