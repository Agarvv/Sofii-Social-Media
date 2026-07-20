<template>
    <div class="layout-container">

        <HeaderComponent />  
        
        <AsideComponent />
        
  
      <main>
        <router-view />
      </main>
  
    </div>
  </template>
  
  <script lang="ts">
   import { defineComponent } from 'vue'
   import HeaderComponent from '@/shared/header/HeaderComponent.vue';
   import AsideComponent from '@/shared/aside/AsideComponent.vue';
  
   export default defineComponent({
      name: 'MainLayout',
      components: {
          HeaderComponent, 
          AsideComponent
      },
   });
  </script>
  
  <style src="./MainLayout.css"></style>
  
