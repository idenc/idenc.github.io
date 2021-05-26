import { createApp } from "vue";
import App from "./App.vue";
import titleMixin from "@/mixins/titleMixin";

const app = createApp(App);
app.mixin(titleMixin);
app.config.globalProperties.$titlePrefix = "Iden's Website | ";
app.mount("#app");
