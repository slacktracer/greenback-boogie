import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.esm.min";

import { createApp } from "vue";

import root from "./root/root.vue";
import router from "./root/router";

import "./root/database";

createApp(root).use(router).mount("#root");
