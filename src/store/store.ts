// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/usersSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createStateSyncMiddleware({})),
})

initMessageListener(store);
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)