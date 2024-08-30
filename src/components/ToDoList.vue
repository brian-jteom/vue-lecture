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

        <!-- 페이징 UI -->
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="fetchTodos"
        />
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
      todos: [],
      currentPage: 1,    // 현재 페이지 번호 (1부터 시작)
      totalPages: 1,     // 총 페이지 수
      pageSize: 10       // 페이지당 할 일 개수
    };
  },
  watch: {
    currentPage() {
      this.fetchTodos();
    }
  },
  created() {
    this.fetchTodos();  // 컴포넌트가 생성될 때 할 일을 로드합니다.
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await todoService.getTodos(this.currentPage - 1, this.pageSize);
        this.todos = response.data.content;  // Page 객체의 content 필드에서 데이터 추출
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo(todoTitle) {
      try {
        const newTodo = { title: todoTitle, completed: false };
        const response = await todoService.createTodo(newTodo);
        this.fetchTodos(); // 새로운 할 일이 추가되면 다시 로드
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    async toggleTodoStatus(todo) {
      try {
        const updatedTodo = { ...todo, completed: !todo.completed };
        await todoService.updateTodo(todo.id, updatedTodo);
        this.fetchTodos(); // 할 일 상태가 변경되면 다시 로드
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    async removeTodo(id) {
      try {
        await todoService.deleteTodo(id);
        this.fetchTodos(); // 할 일이 삭제되면 다시 로드
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  }
};
</script>