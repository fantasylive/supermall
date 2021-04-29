import {request} from './request'

// 对home页面的网络数据请求进行了一次封装
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}