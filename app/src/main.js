import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

Vue.directive('preview', {
  bind(el, binding) {
    el.attachShadow({mode: 'open'});
    el.shadowRoot.innerHTML = binding.value;
  },
  update(el, binding, vnode) {
    if (vnode.elm.shadowRoot.innerHTML !== binding.value) {
      el.shadowRoot.innerHTML = binding.value;
    }
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app');
