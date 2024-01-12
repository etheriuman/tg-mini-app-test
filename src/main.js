import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import eruda from "eruda";
import "./css/index.css";

if (process.env.NODE_ENV === "development") {
    eruda.init();
}

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: function (h) {
        return h(App);
    },
}).$mount("#app");
