// import axios from 'axios';
// // import store from '@/store/index'

// const instance = axios.create({
//     baseURL: 'http://xue.cnkdl.cn:23683',
//     timeout: 8000,
//     responseType: 'json',
//     headers:{
//         'Content-Type': 'application/json;charset=utf-8',
//     }
// })

// // 请求拦截
// instance.interceptors.request.use(
//     config => {
//         // 处理请求数据
//         // config.headers.Authorization = store.state.token;
//         return config;
//     },
//     error => {
//         // 处理请求错误
//         return Promise.reject(error);
//     }
// )

// // 响应拦截
// instance.interceptors.response.use(
//     response => {
//         console.log(response,"response")
//         return response;
//     },
//     error => {
//         console.log(`请求错误：${error}`);
//         return Promise.reject(error)
//     }
// )

// export default instance;