<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">🎉 회원가입</h1>
      <p class="auth-subtitle">QuickMeet에 가입하고<br>친구들과 바로 만나보세요!</p>
      
      <form @submit.prevent="register" class="auth-form">
        <input 
          type="text" 
          placeholder="이름" 
          class="auth-input"
          v-model="name"
          required
        >
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
        <input 
          type="password" 
          placeholder="비밀번호 확인" 
          class="auth-input"
          v-model="confirmPassword"
          required
        >
        <button type="submit" class="auth-btn">회원가입</button>
      </form>
      
      <div class="auth-link">
        이미 계정이 있으신가요? 
        <router-link to="/login">로그인</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.')
        return
      }
      
      // 프로토타입이므로 간단히 메인으로 이동
      alert('회원가입이 완료되었습니다!')
      this.$router.push({ name: 'Home' }).catch(err => {
        console.error('라우팅 에러:', err)
        this.$router.push('/home')
      })
    }
  }
}
</script>
