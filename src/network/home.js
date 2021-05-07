import {request} from './request'

// 对home页面的网络数据请求进行了一次封装
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
        // url:'/test/getBanners'
    })
}

// 请求Home页面的分类数据
export function getHomeData(type, page) {
    return request({
        url: '/home/data',
        // url:'/test/getGoods',
        params: {
            type,
            page
        }
    })
}