<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-center">Vue.js To-Do App</h1>
          <AddTodo @add-todo="addTodo" />
          <ToDoList :todos="todos" @remove-todo="removeTodo" @save-todos="saveTodos" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import AddTodo from './components/AddTodo.vue';
import ToDoList from './components/ToDoList.vue';

export default {
  name: 'App',
  components: {
    AddTodo,
    ToDoList
  },
  data() {
    return {
      todos: []
    };
  },
  mounted() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({ text: newTodo, completed: false });
      this.saveTodos();
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>