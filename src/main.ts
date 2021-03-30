import { createApp } from "vue";
import { Lazyload } from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vant/es/toast/style";
import "vant/es/lazyload/style";

const app = createApp(App);

app.use(Lazyload).use(store).use(router).mount("#app");
