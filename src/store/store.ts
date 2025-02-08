import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        //placeholder: placeholderReducer
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;