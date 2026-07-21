<template>
    <div class="layout-container">

        <div class="c">
          <HeaderComponent />  
        
         <div class="cd">

          <AsideComponent />
        <main>
        <router-view />
      </main>

         </div>
        
        </div>
  
      
  
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
  
