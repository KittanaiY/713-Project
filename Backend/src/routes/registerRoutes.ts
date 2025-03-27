import { Router } from 'express';
import { registerController } from '../controllers/registerController';

const router = Router();

router.post('/register', registerController.registerStudent);
// http://localhost:3000/register/register
// {
//     "studentId": "student12",
//     "firstName": "John",
//     "lastName": "Doe",
//     "profilePicture": "http://example.com/profile.jpg",
//     "department": "Computer Science",
//     "password": "studentpassword123",
//     "advisorId": "1"
// }
export default router;