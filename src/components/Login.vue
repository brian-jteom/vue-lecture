<template>
    <v-container>
      <v-form @submit.prevent="login">
        <v-text-field v-model="username" label="Username" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" color="primary">Login</v-btn>
      </v-form>
      <v-alert v-if="error" type="error">
        {{ error }}
      </v-alert>
    </v-container>
  </template>
  
  <script>
  import authService from '../services/authService';
  
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await authService.login(this.username, this.password);
          const token = response.data;
          localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장
          this.$router.push('/'); // 로그인 후 메인 페이지로 리다이렉트
        } catch (error) {
          this.error = 'Login failed. Please check your credentials and try again.';
        }
      },
    },
  };
  </script>