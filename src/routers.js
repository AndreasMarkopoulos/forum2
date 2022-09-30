import homepage from "@/pages/Homepage.vue";
import myposts from "@/pages/Myposts.vue";
import {createRouter, createWebHistory, RouterView} from "vue-router";
import signIn from "@/pages/SignIn.vue";
import signUp from "@/pages/SignUp.vue";
import userEdit from "@/pages/UserEdit.vue"
import myFeed from "@/pages/MyFeed.vue";
import {useUserStore} from "@/stores/UserStore.js";
import profile from "@/pages/Profile.vue";
import editProfile from "@/pages/EditProfile.vue";

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
            name: "MyFeed",
            component: myFeed,
            path: "/myfeed",
        },
        {
            name: "SignUp",
            component: signUp,
            path: "/signup",
        },
        {
            name: "EditProfile",
            component: editProfile,
            path: '/editprofile'

        },
        {
            name: "Profile",
            component: profile,
            path: '/profile'

        }

    ]
});


router.beforeEach((to, from, next) => {
    if ((to.path === '/myposts' || to.path === '/myfeed' || to.path === '/useredit' || to.path === '/profile' || to.path === '/editprofile' || to.path === '/EditProfile') && !localStorage.getItem('userinfo')) {
        next({path: '/signin'})
    } else if ((to.path === '/signin' || to.path === '/signup') && localStorage.getItem('userinfo')) {
        next({path: '/'})
    }
    if (to.path === '/useredit' && localStorage.getItem('userinfo') && !useUserStore().checkAdmin()) {
        next({path: '/'})
    } else {
        next()
    }
})


export default router;