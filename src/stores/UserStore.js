import {defineStore} from 'pinia'
import axios from "axios";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        admin: Boolean,
        user: Boolean,
        profileUser: Number,
        profilePic: String,
        username: String,
    }),
    actions: {
        async checkAdmin() {
            let username = JSON.parse(localStorage.getItem('userinfo'));
            if (username) {
                let user = await axios.get(`http://localhost:3000/user?username=${username}`);
                this.admin = user.data[0].admin;
                return this.admin
            }
        },
        setProfilePic(value) {
            this.profilePic = value;
        }
        ,
        setUsername(value) {
            this.username = value;
        }
        ,
        noUser() {
            this.user = false;
        },
        yesUser() {
            this.user = true;
        },
    },
    getters: {}

})