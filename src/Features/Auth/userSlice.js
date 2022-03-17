import { createSlice,createAsyncThunk, current } from '@reduxjs/toolkit'
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-key';

// First, create the thunk, đây là async action
// Bài 98: tạo async action ở Register, để sử dụng thì mình phải export ra
export const register = createAsyncThunk('user/register',async (payload) => {
    // call api to register
    // payload ở đây là thông tin mà user nhập từ form
    const data = await userApi.register(payload)
    
    // save data to localstorage
    localStorage.setItem(StorageKeys.TOKEN,data.jwt);
    // vì user là một object nên phải lưu dưới dạng json
    localStorage.setItem(StorageKeys.USER,JSON.stringify(data.user));

    return data.user;
  });

// Bài 98: tạo async action ở Login, để sử dụng thì mình phải export ra
export const login = createAsyncThunk('user/login',async (payload) => {
    // call api to register
    // payload ở đây là thông tin mà user nhập từ form
    const data = await userApi.login(payload)
    
    // save data to localstorage
    localStorage.setItem(StorageKeys.TOKEN,data.jwt);
    // vì user là một object nên phải lưu dưới dạng json
    localStorage.setItem(StorageKeys.USER,JSON.stringify(data.user));

    return data.user;
  });

// vì là gọi api nên mình sẽ viết theo kiểu async action
const userSlice = createSlice({
  name: 'user',
  initialState:{
    // tạo Redux state từ localStorage
      current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
      setting:{},
  },
  reducers: {
    // tạo 1 action để logout
    logout(state){
      // xóa user và token trên localStorage
      // set current về {}
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current={};
    }
  },
  extraReducers:{
    // action type mình tự định nghĩa
    // ý nghĩa của dòng bên dưới : user/register/fullfilled
    [register.fulfilled] : (state, action)=>{
            state.current = action.payload;
        },

    // ý nghĩa của dòng bên dưới : user/login/fullfilled    
    [login.fulfilled] : (state, action)=>{
            state.current = action.payload;
        }
  }
});

const {actions, reducer} = userSlice;
export const {logout} = actions;
export default reducer;