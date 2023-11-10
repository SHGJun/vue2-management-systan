import { handleLoginRequest } from "@/api/login";
import { setLocalStorage } from "@/utils";

export default {
    state: {
            userId: '',
            username: '',
            password: '',
            shg_token: '',
    },
    mutations:{
        getUserInfo(state){
            const userInfo = state;
            return userInfo;
        },
        setUserInfo(state,data){
            state.userId = data.id;
            state.username = data.username;
            state.password = data.password;
            state.shg_token = data.token
        }
    },
    actions: {
        // 登录
        loginRequest(content, userInfo) {
            return new Promise((resolve, reject) => {
                handleLoginRequest(userInfo).then((res) => {
                    if (res.code == 200) {
                        const token = res.data.token;                                 
                        if(!token) return;
                        setLocalStorage("shg_token", token);
                        content.commit('setUserInfo',res.data)
                    }
                    resolve(res);
                })
                    .catch((error) => {
                        reject(error);
                    });
            })
        },
    }
}