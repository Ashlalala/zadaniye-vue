import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    setToken(newToken){
      this.token = newToken
    },
    clearToken(){
      this.token = null
    },

    setUser(newUser){
      this.user = newUser
    },
    clearUser(){
      this.user = null
    }
  },
  persist: true,
})