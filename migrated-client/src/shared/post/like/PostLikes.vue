<template>
    <div @click="like" class="like">
        <span>{{ likesCount }}</span>
        <i :class="['fa', 'fa-thumbs-up', { 'liked': isLiked }]" :style="{ color: isLiked ? 'blue' : '' }"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, computed} from 'vue';
import { apiService } from '@/api/ApiService';
import { useSocket } from '@/composables/useWebSocket';
import { Like } from '@/types/posts/Like';

export default defineComponent({
    name: 'PostLikes',
    props: {
        postId: {
            type: Number,
            required: true,
        },
        postLikes: {
            type: Array as () => Like[],
            required: true,
        },
    },
    setup(props) {
        const userId = Number(localStorage.getItem('userId'));

        const likes = ref<Like[]>([...(props.postLikes || [])]);
        const isLiked = ref<boolean>(likes.value.some(like => like.user_id === userId));

        const likesCount = computed(() => likes.value.length);

        const { socket } = useSocket();

        const like = async () => {
            likes.value.push()
            const data = await apiService.post('/posts/like', { postId: props.postId });
            console.log('Data from like:', data);
        };

        onMounted(() => {
            socket.instance.on('likePost', (liked: Like) => {
                if (liked.post_id === props.postId && !likes.value.some(like => like.user_id === liked.user_id)) {
                    likes.value.push(liked);
                    
                    if (liked.user_id === userId) isLiked.value = true;
                    console.log('Post liked via WebSocket:', liked);
                }
            });

            socket.instance.on('unlikePost', (liked: Like) => {
                if (liked.post_id === props.postId) {
                    const index = likes.value.findIndex(like => like.user_id === liked.user_id);
                    if (index !== -1) {
                        likes.value.splice(index, 1);
                        if (liked.user_id === userId) isLiked.value = false;
                        console.log('Post unliked via WebSocket:', liked);
                    }
                }
            });
        });

        onBeforeUnmount(() => {
            socket.instance.off('likePost');
            socket.instance.off('unlikePost');
        });

        return { like, likes, isLiked, likesCount };
    },
});
</script>

<style scoped src="./PostLikes.css"></style>