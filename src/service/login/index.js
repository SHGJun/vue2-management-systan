import request from '@/utils/request';

export const handleLoginRequest = async(data) =>{
    return await request({
        method:'post',
        type:'form',
        url:'/login',
        data
    });
}