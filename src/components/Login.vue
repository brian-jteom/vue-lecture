<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>

    <!-- Google 로그인 버튼 -->
    <v-btn @click="loginWithGoogle" color="red" class="mt-4">
      Sign in with Google
    </v-btn>

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
    // 일반 로그인
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

    // Google 로그인 처리
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

      window.location.href = authUrl; // Google 로그인 페이지로 리다이렉트
    }
  }
};
</script>