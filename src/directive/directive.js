import Vue from "vue";
// 触摸反馈
const feedback = Vue.directive('fb', {
    inserted: function (el, binding) {
        let timer = null;
        el.addEventListener("touchstart",() => {
            timer = setTimeout(() => {
                el.style.backgroundColor = '#f1f1f1';
            }, 30)
        });
        el.addEventListener("touchmove",() => {
            clearTimeout(timer);
            el.style.backgroundColor = '';
        });
        el.addEventListener("touchend",() => {
            clearTimeout(timer);
            el.style.backgroundColor = '';
        });

        el.addEventListener("mousedown",() => {
            timer = setTimeout(() => {
                el.style.backgroundColor = '#f1f1f1';
            }, 30)
        });
        el.addEventListener("mousemove",() => {
            clearTimeout(timer);
            el.style.backgroundColor = '';
        });
        el.addEventListener("mouseup",() => {
            clearTimeout(timer);
            el.style.backgroundColor = '';
        });
    }
})
// 自动获取焦点
const focus = Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
})

export {feedback, focus};