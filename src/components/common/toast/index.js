/* 
  自定义toast插件
  使用方法: this.$toast.show()
*/
import Toast from "./Toast"
const obj = {}
// main.js中执行Vue.use()方法的时候会执行对象的install方法
obj.install = function (Vue) {
  // 根据组件创建一个构造器
  const toastConstructor = Vue.extend(Toast)
  // 使用构造器创建一个对象
  const toast = new toastConstructor()
  // 将对象挂载到新创建出来的div上
  toast.$mount(document.createElement('div'))
  // 将toast对象的dom添加到Vue的dom中
  document.body.appendChild(toast.$el)
  // 在Vue的原型中添加$toast对象
  Vue.prototype.$toast = toast

}
export default obj