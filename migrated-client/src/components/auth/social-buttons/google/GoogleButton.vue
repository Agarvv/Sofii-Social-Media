<template>
    <div class="google" @click="googleLogin">
        Use Google
    </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue' 
  
  export default defineComponent({
      name: 'GoogleButton',
      setup() {
          const googleLogin = () => {
              window.location.href = "https://sofii-vsly-pkta.onrender.com/api/sofii/auth/google"; 
          }
          
          return {
              googleLogin
          }
      }
  })
</script>

<style scoped src="./GoogleButton.css" >
  
</style>