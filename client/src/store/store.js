import {configureStore} from '@reduxjs/toolkit';
import authReducers from '../features/auth/authSlice'

const store = configureStore({
    reducer : {
        auth: authReducers,
    }
})


export default store;