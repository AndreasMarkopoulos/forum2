import {defineStore} from 'pinia'
import axios from "axios";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        admin: Boolean,
        user: Boolean
    }),
    actions: {
        async checkAdmin() {
            let username = JSON.parse(localStorage.getItem('userinfo'));
            let user = await axios.get(`http://localhost:3000/user?username=${username}`);
            console.log(user.data[0])
            console.log(user.data[0].admin)
            this.admin = user.data[0].admin;
        },
        noUser() {
            this.user = false;
        },
        yesUser() {
            this.user = true;
        },
    },

})