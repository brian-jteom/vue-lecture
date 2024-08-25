import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import ToDoList from '../components/ToDoList.vue'
import ToDoDetail from '../components/ToDoDetail.vue'
import PostList from '@/components/PostList.vue'
import PostDetail from '@/components/PostDetail.vue'

const routes = [
    { path: '/', name: 'Home', component: ToDoList },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/post', name: 'PostList', component: PostList },
    { path: '/todo/:id', name: 'ToDoDetail', component: ToDoDetail, props: true },
    { path: '/post/:id', name: 'PostDetail', component: PostDetail, props: true },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router