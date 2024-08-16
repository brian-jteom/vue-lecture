<template>
  <div>
    <h2>To-Do List</h2>
    <input v-model="newTodo" placeholder="Add a new to-do" @keyup.enter="addTodo" />
    <button @click="addTodo">Add</button>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.completed" @change="saveTodos" />
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
  mounted() {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 할 일 목록을 불러옵니다.
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
        this.saveTodos(); // 새로운 할 일 추가 후 로컬 스토리지에 저장
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos(); // 할 일 삭제 후 로컬 스토리지에 저장
    },
    saveTodos() {
      // 현재 할 일 목록을 로컬 스토리지에 저장합니다.
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: grey;
}
</style>