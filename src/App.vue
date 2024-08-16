<template>
  <h1>Vue.js To-Do App</h1>
  <add-todo @add-todo="addTodo" />
  <to-do-list :todos="todos" @remove-todo="removeTodo" @save-todos="saveTodos" />
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
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
