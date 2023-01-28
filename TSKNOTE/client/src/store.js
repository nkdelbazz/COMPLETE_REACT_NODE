import { configureStore } from '@reduxjs/toolkit'
import userSlice from './storeRedux/userSlice';

export default configureStore({
  reducer: {
    user : userSlice
  },
})