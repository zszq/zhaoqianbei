import confirm from "./confirm.vue"

let confirmComponent = {};
confirmComponent.install = function (Vue, options) {
  let confirmTpl  = Vue.extend(confirm);
  let $vm = new confirmTpl();
  $vm.$mount(document.createElement("div"));
  document.body.appendChild($vm.$el);
  
  Vue.prototype.$confirm = (content, title) => {
    $vm.show = true;
    $vm.content = content ? content : $vm.content;
    $vm.title = title ? title : $vm.title;
    // 返回Promise对象
    return new Promise((resolve, reject) => {
      $vm.promiseStatus = {resolve, reject};
    })
  }
}

export default confirmComponent;

