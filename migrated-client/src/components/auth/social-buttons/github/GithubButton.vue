<template>
    <div class="github" @click="githubLogin">
        Use GitHub 
    </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue' 
  
  export default defineComponent({
      name: 'GitHubButton',
      setup() {
          const githubLogin = () => {
              window.location.href = "https://sofii-vsly-pkta.onrender.com/api/sofii/auth/github"; 
          }
          
          return {
              githubLogin
          }
      }
  })
</script>

<style scoped src="./GithubButton.css">
  
</style>