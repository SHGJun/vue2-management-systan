import { handleLoginRequest,handleRegisterRequest } from "@/api/login";
import { setLocalStorage } from "@/utils";

export default {
    state: {
        userInfo: {
            id: '',
            uasername: '',
            password: '',
            shgToken: '',
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                handleLoginRequest(userInfo).then((res) => {
                    if (res.code == 200) {
                        this.userInfo = res.data
                        const token = res.data.token;
                        if(!token) return;
                        setLocalStorage("shg_token", token);
                    }
                    resolve(res);
                })
                    .catch((error) => {
                        reject(error);
                    });
            })
        },
        // 注册
        Register({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                handleRegisterRequest(userInfo).then((res)=>{
                    // if(res.code == 200){

                    // }else{

                    // }
                    resolve(res);
                }).catch((error) => {
                        reject(error);
                    });
            })
        },
    }
}