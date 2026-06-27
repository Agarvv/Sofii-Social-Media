import { reactive, onMounted, onBeforeUnmount } from 'vue';
import { Socket } from 'socket.io-client'; 
import io from 'socket.io-client';

const socket = reactive({
    instance: io('https://sofii-vsly-pkta.onrender.com', { withCredentials: true }) as Socket, 
});

export function useSocket() {
    onMounted(() => {
        socket.instance.on('connect', () => {
            console.log('Socket connected!');
        });
    });

    return { socket };
}