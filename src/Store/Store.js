import React from 'react';
import {configureStore} from '@reduxjs/toolkit'
import reducer from './authSlice';

const Store = configureStore({
    reducer : {reducer}
})


export default Store;