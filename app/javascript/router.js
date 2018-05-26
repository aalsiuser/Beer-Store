import Vue from "vue/dist/vue.js";
import Router from "vue-router";
import Main from "components/main/index.vue";
import List from "components/beer_store/list.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/blogs", name: "blog", component: Main },
    { path: "/list", name: "list", component: List }
  ]
});

export default router;
