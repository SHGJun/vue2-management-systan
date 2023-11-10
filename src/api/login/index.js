import request from '@/utils/request';

// 登录请求
export const handleLoginRequest = async (data) => {
    return await request({
        method: 'post',
        type: 'form',
        url: '/login',
        data
    });
}

// 注册请求
export const handleRegisterRequest = async (data) => {
    return await request({
        method: 'post',
        type: 'form',
        url: '/register',
        data
    })
}