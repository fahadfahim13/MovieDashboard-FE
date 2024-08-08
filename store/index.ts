import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./features/session";
import { loginApi } from "./apis/loginApi";
import { tvSeriesApi } from "./apis/tvSeriesApi";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [tvSeriesApi.reducerPath]: tvSeriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      loginApi.middleware,
      tvSeriesApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
