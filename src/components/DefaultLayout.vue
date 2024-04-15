<template>
  <div class="flex flex-col items-center w-full mt-5">
      <div class="flex gap-4">
          <button href="/">
            Home
          </button>
          <template v-if="userStore.user">
            <router-link to="/profile">
              Profile
            </router-link> 
            <router-link to="/settings">
              Settings
            </router-link>
          </template>
          <template v-else>
            <router-link to="/login">
              Login
            </router-link>
            <router-link to="/register">
              Register
            </router-link> 
          </template>
      </div>

      <div
          class="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-200 shadow-md overflow-hidden sm:rounded-lg"
      >
          <slot />
      </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore()


</script>

<style>

</style>