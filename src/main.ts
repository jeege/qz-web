import { createApp } from "vue";
import { Lazyload, Toast } from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).use(Lazyload).use(Toast).mount("#app");
