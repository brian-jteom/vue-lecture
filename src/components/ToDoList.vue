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
                @click.stop="toggleTodoStatus({ index, completed: !todo.completed })"
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ToDoList',
  components: { AddTodo },
  computed: {
    ...mapGetters(['todos'])  // Vuex에서 todos 상태를 가져옵니다.
  },
  methods: {
    ...mapActions(['addTodo', 'removeTodo', 'toggleTodoStatus']),  // Vuex 액션들을 가져옵니다.
  },
  created() {
    this.$store.dispatch('loadTodos')  // Vuex 스토어에서 할 일을 로드합니다.
  }
}
</script>