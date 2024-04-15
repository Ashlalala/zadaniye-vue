<template>
  <div>
    <h1 class="text-center text-2xl mb-4">Login</h1>
    <form @submit.prevent="submit" class="flex flex-col gap-2">
      <div class="mt-4">
          <label for="email" value="Email">Email</label>

          <input
              id="email"
              type="email"
              class="mt-1 block w-full"
              v-model="form.email"
              required
              autocomplete="username"
          />

          <!-- <InputError class="mt-2" :message="form.errors.email" /> -->
      </div>

      <div class="mt-4">
          <label for="password" value="Password">Password</label>

          <input
              id="password"
              type="password"
              class="mt-1 block w-full"
              v-model="form.password"
              required
              autocomplete="new-password"
          />

          <!-- <InputError class="mt-2" :message="form.errors.password" /> -->
      </div>

      <div class="flex items-center justify-end mt-4">
          <!-- <Link
              :href="route('login')"
              class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
              Already registered?
          </Link> -->
          <button type="submit" class="border bg-green-500 p-2 w-full">Login</button>
          <button @click.stop="getUser" class="border bg-green-500 p-2 w-full">getUser</button>
      </div>
    </form>
  </div>
</template>


<script setup>
import axios from 'axios';
import { ref, inject } from 'vue';
import { useUserStore } from '@/stores/userStore';

import { postData, getData } from '@/axios/axios';


const userStore = useUserStore()

const API_URL = inject('API_URL')

const form = ref({
  email: '',
  password: '',
})

async function submit(){
  try {
    const data = await postData('login', form.value)
    userStore.setToken(data.access_token)
    console.log(userStore.token);
    await getUser()
  } catch (error) {
    console.log(error);
  }
}

async function getUser(){
  try {
    const user = await getData('user')
    console.log(user)
    userStore.setUser(user)
  } catch (error) {
    console.log(error);
  }
}




</script>


<style>

</style>
