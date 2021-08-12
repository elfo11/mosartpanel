import Vue from "vue";
import App from "./App.vue";
import 'es6-promise/auto'
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css'
import vizrt from '../common/js/payloadhosting.js'

Vue.use(vizrt)

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
  created() {
    this.$vizrt.payloadhosting.initialize(null)
    this.$vizrt.payloadhosting.addEventListener('payloadchange', () => {
      // do this only once when we start up.
      if (!this.$vizrt_props.init) {
        this.$vizrt_props.init = true
        this.$vizrt.payloadhosting.removeEventListener('payloadchange')
      }
    }) 
  },
}).$mount("#app");
