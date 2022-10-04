import homepage from "@/pages/Homepage.vue";
import userPosts from "@/pages/UserPosts.vue";
import {createRouter, createWebHistory, RouterView} from "vue-router";
import signIn from "@/pages/SignIn.vue";
import signUp from "@/pages/SignUp.vue";
import userEdit from "@/pages/UserEdit.vue"
import feed from "@/pages/Feed.vue";
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
            name: "UserPosts",
            component: userPosts,
            path: "/userposts",
        },
        {
            name: "SignIn",
            component: signIn,
            path: "/signin",
        },
        {
            name: "Feed",
            component: feed,
            path: "/feed",
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

        },


    ]
});


router.beforeEach((to, from, next) => {
    if ((to.path === '/posts' || to.path === '/feed' || to.path === '/useredit' || to.path === '/profile' || to.path === '/editprofile' || to.path === '/EditProfile') && !localStorage.getItem('userinfo')) {
        next({path: '/signin'})
    } else if ((to.path === '/signin' || to.path === '/signup') && localStorage.getItem('userinfo')) {
        next({path: '/'})
    } else if (to.path === '/useredit' && (!localStorage.getItem('userinfo') || !useUserStore().checkAdmin())) {
        next({path: '/'})
    } else {
        next()
    }
})


export default router;