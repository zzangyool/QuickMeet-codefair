<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">🚀 QuickMeet</h1>
      <p class="auth-subtitle">친구들과 즉흥적으로 만나는<br>가장 쉬운 방법</p>
      
      <form @submit.prevent="login" class="auth-form">
        <input 
          type="email" 
          placeholder="이메일" 
          class="auth-input"
          v-model="email"
          required
        >
        <input 
          type="password" 
          placeholder="비밀번호" 
          class="auth-input"
          v-model="password"
          required
        >
        <button type="submit" class="auth-btn">로그인</button>
      </form>
      
      <div class="auth-link">
        계정이 없으신가요? 
        <router-link to="/register">회원가입</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // 프로토타입이므로 간단히 메인으로 이동
      console.log('로그인 시도:', this.email)
      this.$router.push({ name: 'Home' }).catch(err => {
        console.error('라우팅 에러:', err)
        this.$router.push('/home')
      })
    }
  }
}
</script>
