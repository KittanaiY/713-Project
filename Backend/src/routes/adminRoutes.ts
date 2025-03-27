import { Router } from 'express';
import { adminController } from '../controllers/adminController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-admin', authenticateToken, authorizeRole(['ADMIN']), adminController.createAdmin);
router.get('/admins', authenticateToken, authorizeRole(['ADMIN']), adminController.getAdmins);
router.put('/admins/:id', authenticateToken, authorizeRole(['ADMIN']), adminController.updateAdmin);
router.delete('/admins/:id', authenticateToken, authorizeRole(['ADMIN']), adminController.deleteAdmin);

router.post('/create-advisor', authenticateToken, authorizeRole(['ADMIN']), adminController.createAdvisor);
router.get('/advisors', authenticateToken, authorizeRole(['ADMIN']), adminController.getAdvisors);
router.put('/advisors/:id', authenticateToken, authorizeRole(['ADMIN']), adminController.updateAdvisor);
router.delete('/advisors/:id', authenticateToken, authorizeRole(['ADMIN']), adminController.deleteAdvisor);

router.post('/create-student', authenticateToken, authorizeRole(['ADMIN']), adminController.createStudent);
// http://localhost:3000/admin/create-student
// {
//     "studentId": "student6",
//     "firstName": "A",
//     "lastName": "B",
//     "department": "Computer Science",
//     "password": "studentpassword123",
//     "advisorId": 2
// }
router.get('/students', authenticateToken, authorizeRole(['ADMIN']), adminController.getStudents);
router.put('/students/:studentId', authenticateToken, authorizeRole(['ADMIN']), adminController.updateStudent);
router.delete('/students/:studentId', authenticateToken, authorizeRole(['ADMIN']), adminController.deleteStudent);

router.get('/search-students', authenticateToken, authorizeRole(['ADMIN']), adminController.searchStudents);

// Admin routes
router.get('/admins', authenticateToken, authorizeRole(['ADMIN']), adminController.getAdmins);

// Advisor routes
router.get('/advisors', authenticateToken, authorizeRole(['ADMIN']), adminController.getAdvisors);

// Student routes
router.get('/students', authenticateToken, authorizeRole(['ADMIN']), adminController.getStudents);


export default router;