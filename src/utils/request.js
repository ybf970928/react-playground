import axios from "axios";

const service = axios.create({
  baseURL: "http://127.0.0.1:9527", // api 的 base_url
  timeout: 60000, // 请求超时时间
  withCredentials: true
})


// Add a request interceptor
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers["token"] = token
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  (response) => {
    // code为1才成功
    if (response.data.code === 1) {
      return response.data;
    } else {
      return Promise.reject(response.data);
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // https://www.axios-http.cn/docs/handling_errors 详见文档
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error.toJSON().message);
    }
  }
);

export default service