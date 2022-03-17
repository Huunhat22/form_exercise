import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Features/Auth/userSlice';

// phải cài thêm react redux : npm install react-redux
// sử dụng redux toollkit
// chứa tất cả reducer mình có
const rootReducer = {
    user: userReducer,
};

const store = configureStore({ 
    reducer: rootReducer 
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export default store;