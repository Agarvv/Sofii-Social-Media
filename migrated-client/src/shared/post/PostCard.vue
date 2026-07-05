<template>
      <div class="post">
      <div class="post-header">
        <div>
          <img
            style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              object-fit: cover;
            "
            :src="post.user.profilePicture"
            alt="Post Owner"
          />
        </div>
        <div class="post-user-detail">
          <h4>{{ post.user.username }}</h4>
        </div>
  
      </div>
      <div class="post-content">
        <div class="post-description">
          <p>{{ post.description }}</p>
        </div>
        <router-link :to="'/post/' + post.id">
          <div class="post-image">
          <img :src="post.postPicture" alt="Post Image" />
        </div>
        </router-link>
      </div>
  
      <div class="post-interactions">
        <div class="like">
          <PostLikes :postId="post.id" :postLikes="post.postLikes"/> 
        </div>
        <div class="comment">
          <i class="fa fa-comments"></i>
          <span>{{ post.postComments.length }}</span>
        </div>
  
        <div class="save">
          <PostSaveds :postId="post.id" :saveds="post.saved_post" /> 
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Post } from '@/types/posts/Post';
  import PostLikes from './like/PostLikes.vue'
  import PostSaveds from './save/PostSaveds.vue'
  
  
  export default defineComponent({
    name: 'PostCard',
    components: {
        PostLikes,
        PostSaveds
    },
    props: {
      post: {
        type: Object as () => Post, 
        required: true,
      },
    },
  });
  </script>
  
  <style scoped src="./PostCard.css"></style>
  