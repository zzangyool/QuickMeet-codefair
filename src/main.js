import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/style.css'

// 동적 임포트로 변경
const Login = () => import('./views/Login.vue')
const Register = () => import('./views/Register.vue')
const Home = () => import('./views/Home.vue')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/home', name: 'Home', component: Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 라우터 디버깅
router.beforeEach((to, from, next) => {
  console.log('라우팅:', from.path, '->', to.path)
  next()
})

router.onError((error) => {
  console.error('라우터 에러:', error)
})

const app = createApp(App)

// 에러 핸들링 추가
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue 에러:', err, info)
}

app.use(router)
app.mount('#app')

console.log('Vue 앱이 초기화되었습니다!')
