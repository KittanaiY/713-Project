import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import adminRoutes from './indexAdmin';
import advisorRoutes from './indexAdvisor';
import studentRoutes from './indexStudent'; 
import AddComment from '../components/AsvisorComp/AddComment.vue';
import AdvisorView from '../views/AdvisorView.vue';
import CreateAnnouncement from '../components/AsvisorComp/CreateAnnouncement.vue';
import ViewAnnouncements from '../components/AsvisorComp/ViewAnnouncements.vue';
import ViewAppointments from '../components/AsvisorComp/ViewAppointments.vue';
import ViewComments from '../components/AsvisorComp/ViewComments.vue';

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  },
  {
      path: '/advisor/dashboard',
      name: 'AdvisorView',
      component: AdvisorView,
      meta: { requiresAuth: true, role: 'ADVISOR' }
    },
    {
      path: '/advisor/create-announcement',
      name: 'CreateAnnouncement',
      component: CreateAnnouncement,
      meta: { requiresAuth: true, role: 'ADVISOR' }
    },
  ...adminRoutes,
  ...advisorRoutes,
  ...studentRoutes ,

];
console.log(routes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  const isLoggedIn = !!token;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'LoginView' });
    } else {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decodedToken = JSON.parse(jsonPayload);
        const userRole = decodedToken.role;
        if (to.matched.some(record => record.meta.role && record.meta.role !== userRole)) {
          next({ name: 'LoginView' });
        } else {
          next();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        next({ name: 'LoginView' });
      }
    }
  } else {
    next();
  }
});

export default router;