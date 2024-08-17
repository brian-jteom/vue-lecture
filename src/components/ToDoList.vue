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
            @click="$router.push({ name: 'ToDoDetail', params: { id: index } })"
          >
            <template v-slot:prepend>
              <v-checkbox
                v-model="todo.completed"
                @change="saveTodos"
                hide-details
              />
            </template>
            
            <v-list-item-title>{{ todo.text }}</v-list-item-title>
            
            <template v-slot:append>
              <v-btn icon="mdi-delete" size="small" @click.stop="removeTodo(index)">
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddTodo from './AddTodo.vue'

export default {
  name: 'ToDoList',
  components: { AddTodo },
  data() {
    return {
      todos: []
    }
  },
  mounted() {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos)
    }
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({ text: newTodo, completed: false })
      this.saveTodos()
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
      this.saveTodos()
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }
}
</script>