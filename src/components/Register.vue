<template>
    <v-container>
      <v-form @submit.prevent="register">
        <v-text-field v-model="username" label="Username" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" required></v-text-field>
        <v-btn type="submit" color="primary">Register</v-btn>
      </v-form>
      <v-alert v-if="error" type="error">
        {{ error }}
      </v-alert>
    </v-container>
  </template>
  
  <script>
  import authService from '../services/authService';
  
  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        error: null,
      };
    },
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          this.error = 'Passwords do not match';
          return;
        }
  
        try {
          await authService.register(this.username, this.password);
          this.$router.push('/login'); // 회원가입 후 로그인 페이지로 리다이렉트
        } catch (error) {
          this.error = 'Registration failed. Please try again.';
        }
      },
    },
  };
  </script>