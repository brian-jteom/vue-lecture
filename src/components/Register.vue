<template>
  <v-container>
    <v-form @submit.prevent="register">
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary">Register</v-btn>
    </v-form>

    <v-divider class="my-4"></v-divider>

    <v-btn @click="loginWithGoogle" color="red" dark>Sign up with Google</v-btn>

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
    
    // Google OAuth 로그인 처리
    loginWithGoogle() {
      const clientId = '940818104733-u8rig7a81655n9dbrseiighcjqae63cn.apps.googleusercontent.com'; // 실제 Google Client ID로 변경
      const redirectUri = 'http://localhost:5173/oauth2/callback'; // OAuth 콜백 처리 URL
      const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
      const responseType = 'token';

      const authUrl = `https://accounts.google.com/o/oauth2/auth?` +
                      `client_id=${clientId}&` +
                      `redirect_uri=${redirectUri}&` +
                      `response_type=${responseType}&` +
                      `scope=${scope}`;

      window.location.href = authUrl; // 구글 로그인 페이지로 리다이렉트
    }
  }
};
</script>