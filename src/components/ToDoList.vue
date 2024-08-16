<template>
  <v-list>
    <v-list-item
      v-for="(todo, index) in todos"
      :key="index"
      :class="{ 'completed': todo.completed }"
    >
      <v-row align="center" no-gutters>
        <v-col cols="auto" class="mr-3">
          <v-checkbox
            v-model="todo.completed"
            @change="saveTodos"
            hide-details
          />
        </v-col>
        <v-col>
          <v-list-item-content>
            <v-list-item-title>{{ todo.text }}</v-list-item-title>
          </v-list-item-content>
        </v-col>
        <v-col cols="auto">
          <v-btn icon small @click="removeTodo(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'TodoList',
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

<style scoped>
.completed .v-list-item__title {
  text-decoration: line-through;
  color: grey;
}
</style>