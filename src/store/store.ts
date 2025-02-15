import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from '../features/movies/moviesSlice';

const store = configureStore({
    reducer: {
        movies: moviesSlice,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;