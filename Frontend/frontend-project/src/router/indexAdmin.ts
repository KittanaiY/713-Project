import AdminView from '../views/AdminView.vue';
import DetailAdminView from '../components/AdminComp/DetailAdminView.vue';
import CreateAdvisorView from '../components/AdminComp/CreateAdvisorView.vue';
import DetailAdvisorView from '../components/AdminComp/DetailAdvisorView.vue';
import CreateStudentView from '../components/AdminComp/CreateStudentView.vue';
import DetailStudentView from '../components/AdminComp/DetailStudentView.vue';
import SummaryPage from '../components/AdminComp/SummaryPage.vue';
import FindStudentView from '../components/AdminComp/FindStudentView.vue';
import { useAdminStore } from '@/stores/admin';
import { useAdvisorStore } from '@/stores/advisor';
import { useStudentStore } from '@/stores/student';

const adminRoutes = [
  {
    path: '/admin/dashboard',
    name: 'AdminView',
    component: AdminView,
    meta: { requiresAuth: true, role: 'ADMIN' },
    beforeEnter: async () => {
      const adminStore = useAdminStore();
      if (adminStore.admins.length === 0) {
        await adminStore.fetchAdmins();
      }
    },
  },
  {
    path: '/detail-admin',
    name: 'DetailAdminView',
    component: DetailAdminView,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/create-advisor',
    name: 'CreateAdvisorView',
    component: CreateAdvisorView,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/detail-advisor',
    name: 'DetailAdvisorView',
    component: DetailAdvisorView,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/create-student',
    name: 'CreateStudentView',
    component: CreateStudentView,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/detail-student',
    name: 'DetailStudentView',
    component: DetailStudentView,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/summary',
    name: 'SummaryPage',
    component: SummaryPage,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/find-student',
    name: 'FindStudentView',
    component: FindStudentView,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
];

export default adminRoutes;