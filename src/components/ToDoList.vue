<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Vue.js To-Do App</h1>
        <AddTodo @add-todo="addTodo" />
        <v-list>
          <v-list-item
            v-for="(todo, index) in todos"
            :key="index"
            @click="$router.push({ name: 'ToDoDetail', params: { id: todo.id } })"
          >
            <template v-slot:prepend>
              <v-checkbox
                v-model="todo.completed"
                @click.stop="toggleTodoStatus(todo)"
                hide-details
              />
            </template>
            
            <v-list-item-title>{{ todo.title }}</v-list-item-title>
            
            <template v-slot:append>
              <v-btn icon="mdi-delete" size="small" @click.stop="removeTodo(todo.id)">
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddTodo from './AddTodo.vue';
import todoService from '../services/todoService';

export default {
  name: 'ToDoList',
  components: { AddTodo },
  data() {
    return {
      todos: []
    };
  },
  created() {
    this.fetchTodos();  // 컴포넌트가 생성될 때 할 일을 로드합니다.
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await todoService.getTodos();
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo(todoTitle) {
      try {
        const newTodo = { title: todoTitle, completed: false };
        const response = await todoService.createTodo(newTodo);
        this.todos.push(response.data);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    async toggleTodoStatus(todo) {
      try {
        const updatedTodo = { ...todo, completed: !todo.completed };
        await todoService.updateTodo(todo.id, updatedTodo);
        this.todos = this.todos.map(t => t.id === todo.id ? updatedTodo : t);
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    async removeTodo(id) {
      try {
        await todoService.deleteTodo(id);
        this.todos = this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  }
};
</script>