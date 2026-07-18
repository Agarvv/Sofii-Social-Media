<template>
    <div class="layout-container">
  
      <main>
        <router-view />
      </main>
  
    </div>
  </template>
  
  <script lang="ts">
   import { defineComponent } from 'vue'
   import HeaderComponent from '@/shared/header/HeaderComponent.vue';
  
   export default defineComponent({
      name: 'MainLayout',
      components: {
          HeaderComponent, 
      },
   });
  </script>
  
  <style src="./MainLayout.css"></style>
  
