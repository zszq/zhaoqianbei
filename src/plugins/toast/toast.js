import toast from "./toast.vue"

let toastComponent = {};
toastComponent.install = function (Vue, options) {
  let toastTpl  = Vue.extend(toast);
  let $vm = new toastTpl();
  $vm.$mount(document.createElement("div"));
  document.body.appendChild($vm.$el);

  let timer = null;
  Vue.prototype.$toast = (text, position) => {
    clearTimeout(timer);
    $vm.show = true;
    $vm.text = text ? text : $vm.text;
    $vm.position = position ? position : $vm.position;
    timer = setTimeout(() => {
      $vm.show = false;
      $vm.text = '请输入内容';
      $vm.position = "center";
    }, 1300)
  }
}

export default toastComponent;

