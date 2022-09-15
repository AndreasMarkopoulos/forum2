import homepage from "@/components/homepage.vue";
import { createRouter, createWebHistory, RouterView } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes:[{
        name: "homepage",
        component: homepage,
        path: "/",
    }
    ],
    RouterView
});

export default router;