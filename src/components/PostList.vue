<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>Vue.js Post Board</h1>
          <AddPost @add-post="addPost" />
          <v-list>
            <v-list-item
              v-for="(post, index) in posts"
              :key="index"
              @click="navigateToDetail(index)"
            >
              <template v-slot:prepend>
                <v-checkbox
                  v-model="post.completed"
                  @click.stop="togglePostStatus(index, !post.completed)"
                  hide-details
                />
              </template>
              
              <v-list-item-title>{{ post.text }}</v-list-item-title>
              
              <template v-slot:append>
                <v-btn icon="mdi-delete" size="small" @click.stop="removePost(index)">
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';  // useRouter를 import
  import { useStore } from 'vuex';
  import AddPost from './AddPost.vue';
  
  export default {
    name: 'PostList',
    components: { AddPost },
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const posts = computed(() => store.getters.posts);
      const addPost = (postText) => store.dispatch('addPost', postText);
      const removePost = (index) => store.dispatch('removePost', index);
      const togglePostStatus = (index, completed) =>
        store.dispatch('togglePostStatus', { index, completed });
  
      const navigateToDetail = (index) => {
        // Navigate to post detail page
        router.push({ name: 'PostDetail', params: { id: index } });
      };
  
      onMounted(() => {
        store.dispatch('loadPosts');
      });
  
      return {
        posts,
        addPost,
        removePost,
        togglePostStatus,
        navigateToDetail,
      };
    },
  };
  </script>