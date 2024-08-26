import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import ToDoList from '../components/ToDoList.vue'
import ToDoDetail from '../components/ToDoDetail.vue'
import PostList from '@/components/PostList.vue'
import PostDetail from '@/components/PostDetail.vue'

const routes = [
    { path: '/', name: 'Home', component: ToDoList, meta: { requiresAuth: true }  },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register, meta: { requiresAuth: true }  },
    { path: '/post', name: 'PostList', component: PostList, meta: { requiresAuth: true }  },
    { path: '/todo/:id', name: 'ToDoDetail', component: ToDoDetail, props: true, meta: { requiresAuth: true }  },
    { path: '/post/:id', name: 'PostDetail', component: PostDetail, props: true, meta: { requiresAuth: true }  },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  // 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // 토큰이 있으면 로그인 상태로 간주

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // 인증이 필요한 페이지에 접근하려 하지만 로그인하지 않은 경우
    next('/login'); // 로그인 페이지로 리다이렉트
  } else {
    next(); // 해당 페이지로 이동
  }
});
  
  export default router