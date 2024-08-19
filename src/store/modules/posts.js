


const state = {
  posts: []
}

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  addPost(state, post) {
    state.posts.push(post);
  },
  removePost(state, index) {
    if (index >= 0 && index < state.posts.length) {
      state.posts.splice(index, 1);
    }
  },
  updatePostStatus(state, { index, completed }) {
    if (index >= 0 && index < state.posts.length) {
      state.posts[index].completed = completed;
    }
  }
}

const actions = {
  loadPosts({ commit }) {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      commit('setPosts', JSON.parse(savedPosts));
    }
  },
  savePosts({ state }) {
    localStorage.setItem('posts', JSON.stringify(state.posts));
  },
  addPost({ commit, dispatch }, postText) {
    const newPost = { text: postText, completed: false };
    commit('addPost', newPost);
    dispatch('savePosts');
  },
  removePost({ commit, dispatch }, index) {
    commit('removePost', index);
    dispatch('savePosts');
  },
  togglePostStatus({ commit, dispatch }, payload) {
    commit('updatePostStatus', payload);
    dispatch('savePosts');
  }
}

const getters = {
  posts(state) {
    return state.posts;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
};