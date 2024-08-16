<template>
    <div>
        <h2>To-Do List</h2>
        <input v-model="newTodo" placeholder="Add a new to-do" @keyup.enter="addTodo" />
        <button @click="addTodo">Add</button>
        
        <ul>
        <li v-for="(todo, index) in todos" :key="index">
            <input type="checkbox" v-model="todo.completed" />
            <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
            <button @click="removeTodo(index)">Delete</button>
        </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'ToDoList',
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>

<style>
.completed {
  text-decoration: line-through;
  color: grey;
}
</style>