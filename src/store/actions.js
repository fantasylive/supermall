import {
  ADD_COUNTER,
  ADD_TO_CART,
} from './mutation-types'

export default {
  // 将数据保存到store
  addCart(context, payload) {
    // 使用Promise返回一个Promise告知添加操作已经完成
    return new Promise((resolve, reject) => {
      // 如果购物车添加的是数组中已存在的商品那么就将它的count属性+1
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else {
        // 否则就是新添加的商品，给他添加新的属性count为1，并添加到数组中
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}