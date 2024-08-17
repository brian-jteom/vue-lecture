import { createRouter, createWebHistory } from 'vue-router'
import ToDoList from '../components/ToDoList.vue'
import ToDoDetail from '../components/ToDoDetail.vue'

const routes = [
    { path: '/', name: 'Home', component: ToDoList },
    { path: '/todo/:id', name: 'ToDoDetail', component: ToDoDetail, props: true }
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router