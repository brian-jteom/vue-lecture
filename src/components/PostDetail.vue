<template>
    <v-container>
      <h2>Post Detail</h2>
      <v-card>
        <v-card-text>
          <p>ID: {{ id }}</p>
          <p v-if="post">Text: {{ post.text }}</p>
          <p v-else>Post not found</p>
        </v-card-text>
      </v-card>
      <v-btn @click="$router.push('/post')">Back</v-btn>
    </v-container>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const store = useStore();
      const route = useRoute();
  
      const id = computed(() => route.params.id);
      const post = computed(() => store.getters['posts'][id.value]);
  
      return {
        id,
        post,
      };
    },
  };
  </script>