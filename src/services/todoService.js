import apiClient from './api';

export default {
  getTodos() {
    return apiClient.get('/todos');
  },
  
  getTodoById(id) {
    return apiClient.get(`/todos/${id}`);
  },

  createTodo(todo) {
    return apiClient.post('/todos', todo);
  },

  updateTodo(id, todo) {
    return apiClient.put(`/todos/${id}`, todo);
  },

  deleteTodo(id) {
    return apiClient.delete(`/todos/${id}`);
  }
};