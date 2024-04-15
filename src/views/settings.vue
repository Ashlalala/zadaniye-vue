<template>
  <div>
    <h1 class="text-center text-2xl mb-4">Users Settings</h1>
    <div class="flex flex-col gap-2">
      <div class="mt-4 flex">
          <label for="notifications_email" value="notifications_email">Email Notifications</label>

          <input
              id="notifications_email"
              type="checkbox"
              class="mt-1 block w-full"
              v-model="form.notifications_email"
              required
          />

      </div>

    </div>

    <div class="flex items-center justify-end mt-4">
      <button @click.prevent="isChooseVerificationMethod=true" class="border bg-green-500 p-2 w-full">Save Changes</button>
    </div>
  </div>

  <!-- Popup with background -->
  <div v-if="isChooseVerificationMethod" @click="isChooseVerificationMethod=false" class="fixed inset-0 flex items-center justify-center">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div @click.stop class="relative bg-white rounded-lg p-6">
      <h2 class="text-lg font-bold mb-4">Choose an Option</h2>
      <form @submit.prevent="getCode">
        <label class="block mb-2">
          <input type="radio" v-model="verificationMethod" value="email" class="mr-2"> Email
        </label>
        <label class="block mb-2">
          <input type="radio" v-model="verificationMethod" value="sms" class="mr-2"> SMS
        </label>
        <label class="block mb-4">
          <input type="radio" v-model="verificationMethod" value="telegram" class="mr-2"> Telegram
        </label>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  </div>

  <div v-if="isEnterCode" @click="isEnterCode=false" class="fixed inset-0 flex items-center justify-center">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div @click.stop class="relative bg-white rounded-lg p-6">
      <h2 class="text-lg font-bold mb-4">Enter the verification code</h2>
      <form @submit.prevent="submit">
        <label class="block mb-2">
          <input type="number" v-model="code" value="code" class="mr-2 border">
        </label>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import axios from 'axios';
import { ref, inject } from 'vue';
import { useUserStore } from '@/stores/userStore';

import { postData, getData, patchData } from '@/axios/axios';


const userStore = useUserStore()

const API_URL = inject('API_URL')

const verificationMethod = ref('email')

const form = ref({
  notifications_email: userStore.notifications_email
})

const code = ref(null)

const isChooseVerificationMethod = ref(false)
const isEnterCode = ref(false)


async function submit(){
  try {
    console.log(form.value)

    const data = await patchData('settings?code='+code.value, form.value)

    console.log(data)
  } catch (error) {
    console.log(error);
  }
  
}

async function getCode(){

  try {
    const code = await getData('send-code?method='+verificationMethod.value)
    
    console.log(code)

    isChooseVerificationMethod.value = false
    isEnterCode.value = true

  } catch (error) {
    console.log(error);
  }
  
}




</script>


<style>

</style>
