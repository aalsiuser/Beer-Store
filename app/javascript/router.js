import Vue from "vue/dist/vue.js";
import Router from "vue-router";
import Main from "components/main/index.vue";
import List from "components/beer_store/list.vue";
import Cart from "components/beer_store/cart.vue";
import CheckOut from "components/beer_store/checkout.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/blogs", name: "Blog", component: Main },
    { path: "/list", name: "List", component: List },
    { path: "/cart", name: "Cart", component: Cart },
    { path: "/checkout", name: "Checkout", component: CheckOut }
  ]
});

export default router;
