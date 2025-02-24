import { configureStore } from "@reduxjs/toolkit";
import mediaSlice from '../features/media/mediaSlice';

const store = configureStore({
    reducer: {
        media: mediaSlice,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;