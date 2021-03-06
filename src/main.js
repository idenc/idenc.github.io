import { createApp } from "vue";
import App from "./App.vue";
import titleMixin from "@/mixins/titleMixin";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faUser,
  faMapMarkerAlt,
  faEnvelope,
  faClock,
  faCode,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBriefcase,
  faUser,
  faMapMarkerAlt,
  faEnvelope,
  faClock,
  faCode,
  faGraduationCap
);

const app = createApp(App);
app.mixin(titleMixin);
app.config.globalProperties.$titlePrefix = "Iden's Website | ";
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
