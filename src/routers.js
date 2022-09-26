import homepage from "@/pages/Homepage.vue";
import myposts from "@/pages/Myposts.vue";
import {createRouter, createWebHistory, RouterView} from "vue-router";
import signIn from "@/pages/SignIn.vue";
import signUp from "@/pages/SignUp.vue";
import userEdit from "@/pages/UserEdit.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "UserEdit",
            component: userEdit,
            path: "/useredit",
        },
        {
            name: "Homepage",
            component: homepage,
            path: "/",
        },
        {
            name: "Myposts",
            component: myposts,
            path: "/myposts",
        },
        {
            name: "SignIn",
            component: signIn,
            path: "/signin",
        },
        {
            name: "SignUp",
            component: signUp,
            path: "/signup",
        },
    ]
});

export default router;