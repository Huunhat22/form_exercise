import axios from 'axios';

const axiosClient = axios.create({
    baseURL:'https://api.ezfrontend.com/',
    headers:{
        'Content-Type':'application/json',
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log("Response error: ", error.response);
    // sử dụng object destructuring
    const {config,status,data} = error.response;
    const URLs = ['/auth/local/register','/auth/local'];
    if (URLs.includes(config.url) && status === 400) {
      // lấy ra error message trong response

      // errorList là 1 mảng: sẽ trả về data trong key data hoặc mảng rỗng
      const errorList = data.data || [];

      // firstError là object: nếu mà trong errorList có phần tử thì lấy phần tử đầu, không có thì trả về object rỗng
      const firstError = errorList.length > 0 ? errorList[0] : {};

      // messageList là mảng : trong mảng là nhiều object trả về nhiều object messages
      const messageList = firstError.messages || [];

      // firstMessage là object : trong object có 2 key là : id và message 
      const firstMessage = messageList.length > 0 ? messageList[0] : {};

      throw new Error(firstMessage.message);
    }
    return Promise.reject(error);
  });

export default axiosClient;