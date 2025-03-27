import AdvisorView from '../views/AdvisorView.vue';
import CreateAnnouncement from '../components/AsvisorComp/CreateAnnouncement.vue';
import ViewAnnouncements from '../components/AsvisorComp/ViewAnnouncements.vue';
import ViewAppointments from '../components/AsvisorComp/ViewAppointments.vue';
import AddComment from '../components/AsvisorComp/AddComment.vue';
import ViewComments from '../components/AsvisorComp/ViewComments.vue';

import { useAnnouncementStore } from '@/stores/announcement';
import { useStudentStore } from '@/stores/student';
import { useAppointmentStore } from '@/stores/appointment';
import { useCommentStore } from '@/stores/comment';

const advisorRoutes = [
  {
    path: '/advisor/dashboard',
    name: 'AdvisorView',
    component: AdvisorView,
    meta: { requiresAuth: true, role: 'ADVISOR' },
    beforeEnter: async () => {
      const announcementStore = useAnnouncementStore();
      const studentStore = useStudentStore();
      const appointmentStore = useAppointmentStore();
      const commentStore = useCommentStore();

      // Fetch data for all relevant stores
      if (announcementStore.announcements.length === 0) {
        await announcementStore.fetchAnnouncements();
      }
      if (studentStore.students.length === 0) {
        await studentStore.fetchStudentsFromAdvisor();
      }
      if (appointmentStore.appointments.length === 0) {
        await appointmentStore.fetchAppointments();
      }
      if (commentStore.comments.length === 0) {
        await commentStore.fetchComments();
      }
    },
  },
  {
    path: '/advisor/create-announcement',
    name: 'AdvisorCreateAnnouncement',
    component: CreateAnnouncement,
    meta: { requiresAuth: true, role: 'ADVISOR' },
  },
  {
    path: '/advisor/view-announcements',
    name: 'AdvisorViewAnnouncements',
    component: ViewAnnouncements,
    beforeEnter: async () => {
      const announcementStore = useAnnouncementStore();
      if (announcementStore.announcements.length === 0) {
        await announcementStore.fetchAnnouncements();
      }
    },
    meta: { requiresAuth: true, role: 'ADVISOR' },
  },
  {
    path: '/advisor/view-appointments',
    name: 'AdvisorViewAppointments',
    component: ViewAppointments,
    beforeEnter: async () => {
      const appointmentStore = useAppointmentStore();
      if (appointmentStore.appointments.length === 0) {
        await appointmentStore.fetchAppointments();
      }
    },
    meta: { requiresAuth: true, role: 'ADVISOR' },
  },
  {
    path: '/advisor/add-comment',
    name: 'AdvisorAddComment',
    component: AddComment,
    meta: { requiresAuth: true, role: 'ADVISOR' },
  },
  {
    path: '/advisor/view-comments',
    name: 'AdvisorViewComments',
    component: ViewComments,
    beforeEnter: async () => {
      const commentStore = useCommentStore();
      if (commentStore.comments.length === 0) {
        await commentStore.fetchComments();
      }
    },
    meta: { requiresAuth: true, role: 'ADVISOR' },
  },
];

export default advisorRoutes;