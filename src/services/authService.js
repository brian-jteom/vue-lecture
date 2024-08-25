import apiClient from './api';

export default {
  // 로그인 메서드: 사용자 자격 증명을 받아 서버로 전송하고, JWT 토큰을 반환받음
  login(username, password) {
    return apiClient.post('/auth/login', {
      username: username,
      password: password,
    });
  },

  // 회원가입 메서드: 새로운 사용자 정보를 서버로 전송하여 회원가입을 처리
  register(username, password) {
    return apiClient.post('/auth/register', {
      username: username,
      password: password,
      authority: 'USER'
    });
  }
};