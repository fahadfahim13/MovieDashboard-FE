import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./features/session";
import { loginApi } from "./apis/loginApi";
import { tvSeriesApi } from "./apis/tvSeriesApi";
import { seasonsApi } from "./apis/seasonsApi";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [tvSeriesApi.reducerPath]: tvSeriesApi.reducer,
    [seasonsApi.reducerPath]: seasonsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      loginApi.middleware,
      tvSeriesApi.middleware,
      seasonsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
