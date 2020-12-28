import { createApp } from "vue";
import { Lazyload, Toast } from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(Lazyload).use(Toast).use(store).use(router).mount("#app");
