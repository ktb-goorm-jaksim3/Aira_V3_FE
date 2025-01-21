import { createRouter, createWebHistory } from 'vue-router';
import SignupForm from '../components/SignupForm.vue';
import LoginForm from '../components/LoginForm.vue';
import AiraIntro from '../components/AiraIntro.vue';
import Question1 from '../components/Question-1.vue';
import Question2 from '../components/Question-2.vue';
import Question3 from '../components/Question-3.vue';
import Question4 from '../components/Question-4.vue';
import Question5 from '../components/Question-5.vue';
import Summary from '../components/SummaryPage.vue';

const routes = [
  { path: '/', redirect: '/signup' }, // 기본 경로를 로그인 페이지로 설정
  { path: '/signup', component: SignupForm },
  { path: '/login', component: LoginForm },
  { path: '/intro', component: AiraIntro },
  { path: '/question1', component: Question1 },
  { path: '/question2', component: Question2 },
  { path: '/question3', component: Question3 },
  { path: '/question4', component: Question4 },
  { path: '/question5', component: Question5 },
  { path: '/summary', component: Summary },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;