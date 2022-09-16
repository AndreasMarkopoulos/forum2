import {defineStore} from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: false
    }),
    actions: {
        get() {
            return this.user;
        },
        noUser() {
            this.user = false;
        },
        yesUser() {
            this.user = true;
        },
    }
})