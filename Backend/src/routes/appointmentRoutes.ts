import { Router } from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-appointment', authenticateToken, authorizeRole(['STUDENT']), appointmentController.createAppointment);
// http://localhost:3000/appointments/create-appointment
// {
//     "subject": "Discuss project progress",
//     "requestedDate": "2025-03-25T10:00:00Z",
//     "studentId": "student1",
//     "advisorId": 1
// }
router.get('/appointments', authenticateToken, authorizeRole(['ADVISOR', 'STUDENT']), appointmentController.getAppointments);
// http://localhost:3000/appointments/appointments
router.put('/appointments/:id', authenticateToken, authorizeRole(['ADVISOR']), appointmentController.updateAppointment);
router.put('/appointments/:id/confirm', authenticateToken, authorizeRole(['STUDENT']), appointmentController.confirmAppointment);
// http://localhost:3000/appointments/appointments/{appointmentId}/confirm
// {
//     "confirmedDate": "2025-03-25T10:00:00Z"
// }
router.delete('/appointments/:id', authenticateToken, authorizeRole(['ADVISOR']), appointmentController.deleteAppointment);

export default router;