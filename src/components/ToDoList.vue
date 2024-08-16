<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <input type="checkbox" v-model="todo.completed" @change="saveTodos" />
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <button @click="removeTodo(index)">Delete</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ToDoList',
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  methods: {
    removeTodo(index) {
      this.$emit('remove-todo', index);
    },
    saveTodos() {
      this.$emit('save-todos');
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