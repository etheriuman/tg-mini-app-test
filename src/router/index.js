import Vue from "vue";
import VueRouter from "vue-router";
import Matches from "@/views/Matches.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "index",
        redirect: { name: "matches" },
    },
    {
        path: "/matches",
        name: "matches",
        component: Matches,
    },
    {
        path: "/matchdetails/:id",
        name: "match-details",
        component: () => import("@/views/matchDetails/MatchDetails.vue"),
    },
    {
        path: "/record",
        name: "record",
        component: () => import("@/views/Record.vue"),
    },
    {
        path: "/wallet",
        name: "wallet",
        component: () => import("@/views/Wallet.vue"),
    },
    {
        path: "*",
        redirect: { name: "index" },
    },
];

const router = new VueRouter({
    routes,
});

export default router;
