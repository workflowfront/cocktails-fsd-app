import { configureStore } from '@reduxjs/toolkit';
import { cocktailApi } from '@entities/cocktail/model/cocktailApi';

export const store = configureStore({
  reducer: {
    [cocktailApi.reducerPath]: cocktailApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cocktailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
