import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SendResetPasswordView from '@/views/auth/SendResetPasswordView.vue'
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue'
import CreateView from '@/views/create/CreateView.vue'
import PostDetails from '@/views/post-details/PostDetails.vue'
import axios from 'axios'
import ProfileView from '@/views/profile/ProfileView.vue'
import FriendsView from '@/views/friends/FriendsView.vue'
import NotificationsView from '@/views/notifications/NotificationsView.vue'
import ChatsView from '@/views/chats/ChatsView.vue'
import ChatView from '@/views/chat/ChatView.vue'
import SearchView from '@/views/search/SearchView.vue'
import SavedView from '@/views/saved/SavedView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    component: RegisterView,
    name: "register"
  }, 
  {
    path: '/login',
    component: LoginView,
    name: "login"
  },
  {
    path: '/send-reset-password',
    component: SendResetPasswordView,
    name: "sendResetPassword"
  }, 
  {
    path: '/reset-password/:email/:token',
    component: ResetPasswordView,
    name: "resetPassword"
  },  
  {
      path: '/',
        component: HomeView,
        name: "home",
  },
  {
      path: '/post/:id',
      component: PostDetails,
      name: "postDetails"
  },
  {
    path: '/create',
    component: CreateView,
    name: "create"
  },
  {
    path: '/profile/:id',
    component: ProfileView 
  },
  {
      path: '/chat/:id',
      component: ChatView,
      name: "chat"
  },
  {
      path: '/search/:query',
      component: SearchView
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/chats',
        component: ChatsView,
        name: "chats"
      },
      {
        path: '/saved',
        component: SavedView,
        name: "saved"
      },
      {
        path: '/notifications',
        component: NotificationsView,
        name: "notifications"
    },
    {
      path: '/friends', 
      component: FriendsView,
      name: "friends"
    },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await axios.get('https://sofii-vsly-pkta.onrender.com/api/sofii/auth/check', {
        withCredentials: true 
    }); 
    
    console.log('authenticated response', response)
    
    console.log("authenticated condition", response.status == 200)
    return response.status == 200; 
    
  } catch (error) {
    return false;  
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const authenticated = await isAuthenticated();  

    if (!authenticated) {
      next({ name: 'login' });
    } else {
      next(); 
    }
  } else {
    next();  
  }
});

export default router