import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducers from '../features/auth/authSlice'
import searchReducers from '../features/product/searchSlice'
import cartReducers from '../features/cart/cartSlice'

const rootReducer = combineReducers({
    auth: authReducers,
  search: searchReducers,
  cart: cartReducers,
})


const persistConfig ={
    key: 'rooot',
    storage,
    blacklist: ['auth'],
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer : persistedReducer
})

const persistor = persistStore(store)



export {store, persistor};