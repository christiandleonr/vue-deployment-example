import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import moment from 'moment';
import BootstrapVue from 'bootstrap-vue'
import { BAvatar } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {
    ValidationObserver,
    ValidationProvider,
    VeeValidate,
    extend,
    localize
} from "vee-validate";
import es from "vee-validate/dist/locale/es.json";
import * as rules from "vee-validate/dist/rules";
import VueSuggestion from 'vue-suggestion'



Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

localize("es", es);


Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component('b-avatar', BAvatar)
Vue.use(BootstrapVue)
Vue.config.productionTip = false


Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'application/json'
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
    }
});
Vue.use(VueSuggestion);

new Vue({
    router,
    template: '<App/>',
    components: { App },
    store,
    render: h => h(App)
}).$mount("#app");