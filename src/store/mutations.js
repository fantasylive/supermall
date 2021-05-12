import {
  ADD_COUNTER,
  ADD_TO_CART,
} from './mutation-types'

export default {
  // 已存在的商品count+1
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  // 新商品添加新属性 选中状态为true 添加到数组中
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}