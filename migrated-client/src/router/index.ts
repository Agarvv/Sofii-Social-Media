// router/index.ts
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
    name: "register",
    meta: {
      requiresAuth: false
    }
  }, 
  {
    path: '/login',
    component: LoginView,
    name: "login", 
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/send-reset-password',
    component: SendResetPasswordView,
    name: "sendResetPassword",
    meta: {
      requiresAuth: false
    }
  }, 
  {
    path: '/reset-password/:email/:token',
    component: ResetPasswordView,
    name: "resetPassword",
    meta: {
      requiresAuth: false
    }
  },  
  {
    path: '/',
    component: HomeView,
    name: "home",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/post/:id',
    component: PostDetails,
    name: "postDetails",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create',
    component: CreateView,
    name: "create",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/:id',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chat/:id',
    component: ChatView,
    name: "chat",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search/:query',
    component: SearchView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    component: MainLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/chats',
        component: ChatsView,
        name: "chats",
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/saved',
        component: SavedView,
        name: "saved",
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/notifications',
        component: NotificationsView,
        name: "notifications",
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/friends', 
        component: FriendsView,
        name: "friends",
        meta: {
          requiresAuth: true
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


//let isAuthChecked = false
//let isAuthenticated = false
/*
const checkAuth = async (): Promise<boolean> => {
  if (isAuthChecked) {
    return isAuthenticated
  }
  
  try {
    const response = await axios.get('https://sofii-vsly-pkta.onrender.com/api/sofii/auth/check', {
      withCredentials: true 
    })
    
    isAuthenticated = response.status === 200
    isAuthChecked = true
    return isAuthenticated
  } catch (error) {
    isAuthenticated = false
    isAuthChecked = true
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  const authenticated = await checkAuth()
  
  if (to.meta.requiresAuth && !authenticated) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register' || to.name === 'sendResetPassword') && authenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})
  */

export default router