import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import titleMixin from "@/mixins/titleMixin";

const app = createApp(App);
app.mixin(titleMixin);
app.config.globalProperties.$titlePrefix = "Iden's Website | ";
app.use(router).mount("#app");
