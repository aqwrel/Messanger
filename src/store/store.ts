// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/usersSlice";
import chatReducer from "./features/chats/chatsSlice";
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers, persistStore } from 'redux-persist';
import {
    createStateSyncMiddleware,
    initMessageListener,
} from "redux-state-sync";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';

const persistConfig = {
    key: 'root',
    storage,
}

const config = {
    blacklist: [PERSIST, PURGE, REGISTER],
};

const persistedReducer = persistCombineReducers(persistConfig, {
    users: userReducer,
    chats: chatReducer,
})

export const store = configureStore({
    reducer: persistedReducer,
    //@ts-ignore
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(createStateSyncMiddleware(config)),
})

initMessageListener(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)