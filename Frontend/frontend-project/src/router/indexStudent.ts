import StudentView from '../views/StudentView.vue';
import CreateAppointment from '../components/StudentComp/CreateAppointment.vue';
import ViewAppointments from '../components/StudentComp/ViewAppointments.vue';
import ViewAnnouncements from '../components/StudentComp/ViewAnnouncements.vue';
import AddComment from '../components/StudentComp/AddComment.vue';
import ViewComments from '../components/StudentComp/ViewComments.vue';

import { useAppointmentStore } from '@/stores/appointment';
import { useAnnouncementStore } from '@/stores/announcement';
import { useCommentStore } from '@/stores/comment';

const studentRoutes = [
  {
    path: '/student/dashboard',
    name: 'StudentView',
    component: StudentView,
    meta: { requiresAuth: true, role: 'STUDENT' },
    beforeEnter: async () => {
      const appointmentStore = useAppointmentStore();
      const announcementStore = useAnnouncementStore();
      const commentStore = useCommentStore();

      // Fetch data for all relevant stores
      if (appointmentStore.appointments.length === 0) {
        await appointmentStore.fetchAppointments();
      }
      if (announcementStore.announcements.length === 0) {
        await announcementStore.fetchAnnouncements();
      }
      if (commentStore.comments.length === 0) {
        await commentStore.fetchCommentsForStudent();
      }
    },
  },
  {
    path: '/student/create-appointment',
    name: 'CreateAppointment',
    component: CreateAppointment,
    meta: { requiresAuth: true, role: 'STUDENT' },
  },
  {
    path: '/student/view-appointments',
    name: 'ViewAppointments',
    component: ViewAppointments,
    meta: { requiresAuth: true, role: 'STUDENT' },
  },
  {
    path: '/student/view-announcements',
    name: 'ViewAnnouncements',
    component: ViewAnnouncements,
    meta: { requiresAuth: true, role: 'STUDENT' },
  },
  {
    path: '/student/add-comment',
    name: 'AddComment',
    component: AddComment,
    meta: { requiresAuth: true, role: 'STUDENT' },
  },
  {
    path: '/student/view-comments',
    name: 'ViewComments',
    component: ViewComments,
    meta: { requiresAuth: true, role: 'STUDENT' },
  },
];

export default studentRoutes;