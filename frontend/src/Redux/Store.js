import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PERSIST,PURGE,REGISTER, PAUSE} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import {AdminAuth} from "./AdminAuth";



const adminPersistConfig = { key: 'Admin', storage, version: 1 };
const adminPersistReducer = persistReducer(adminPersistConfig, AdminAuth.reducer);





export const Store = configureStore({
    reducer: {
        Admin: adminPersistReducer,
    },
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
});


export const persistor = persistStore(Store);