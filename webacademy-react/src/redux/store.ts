import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countReducer from "./slices/count.slice";
import carrinhoReducer from "./slices/carrinho.slice";
import { apiLoginReducer } from "./slices/api.slice.login";

import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { apiProdutoReducer } from "./slices/api.slice.produtos";

const rootReducer = combineReducers({
  count: countReducer,
  apiLogin: apiLoginReducer,
  apiProduto: apiProdutoReducer,
  carrinho: carrinhoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["apiProduto"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
