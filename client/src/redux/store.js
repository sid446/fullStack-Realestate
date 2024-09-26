import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import {persistedReducer} from "redux-persist"
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
const rootReducer=combineReducers({user:userReducer})

const PersistConfig={
  key:'root',
  storage,
  version:1
}
const persistedReducer=persistedReducer(
  PersistConfig,rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializability checks for actions
    }),
});

export const persistor=persistStore(store)