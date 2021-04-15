import { createWebHistory, createRouter } from "vue-router";

import accounts from "../accounts/accounts.vue";
import backup from "../backup/backup.vue";
import home from "../home/home.vue";
import operations from "../operations/operations.vue";

const routes = [
  {
    path: "/accounts",
    name: "accounts",
    component: accounts,
  },
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
  {
    path: "/operations",
    name: "operations",
    component: operations,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
