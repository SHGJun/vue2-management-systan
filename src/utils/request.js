import axios from "axios";
import { MessageBox, Message } from "element-ui";
import { getLocalStorage, removeLocalStorage } from "./";

export default (config) => {

    const baseURL = process.env.NODE_ENV === 'production' ? process.env.VITE_APP_BASE_API : '/api';
    // 超时
    const timeout = 5000;
    // 创建axios实例
    const service = axios.create({
        baseURL,
        timeout
    })

    // requist拦截器
    service.interceptors.request.use((config) => {
        config.headers["Authorization"] = getLocalStorage('shg_token') || "";
        config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";
        if (config.type == "file") {
            config.headers["content-type"] = "application/multipart/form-data";
        } else if (config.type == "form") {
            config.headers["Content-type"] = "application/x-www-form-urlencoded";
        }
        if (config.method && config.method.toLowerCase() === "get") {
            config.data = true;
        }
        return config;
    },
        (error) => {
            return Promise.reject(error);
        });

    // reponst拦截器
    service.interceptors.response.use((response) => {
        const code = response.code;
        if (code === 401) {
            MessageBox.confirm("登录状态已过期，您可以继续留在该页面，或者重新登录", "系统提示", {
                confirmButtonText: "重新登录",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                // 调用退出登录接口
                removeLocalStorage('shg_token')
            });
        } else if (code !== 200) {
            Message({
                message: response.data.msg,
                type: "error",
                duration: 5 * 1000
            });
            return Promise.reject("error");
        } else {
            return response.data;
        }
    },
        (error) => {
            Message({
                message: error.message,
                type: "error",
                duration: 5 * 1000
            });
            return Promise.reject(error);
        })

        return service(config);
};