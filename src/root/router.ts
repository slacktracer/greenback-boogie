import { createWebHistory, createRouter } from "vue-router";

import backup from "../backup/backup.vue";
import home from "../home/home.vue";

const routes = [
  {
    path: "/backup",
    name: "backup",
    component: backup,
  },
  {
    path: "/",
    name: "home",
    component: home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
