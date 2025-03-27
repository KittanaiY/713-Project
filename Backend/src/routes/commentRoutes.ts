import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();


router.post(
    '/add-comment',
    authenticateToken,
    authorizeRole(['ADVISOR', 'STUDENT']),
    commentController.addComment
  );
// http://localhost:3000/comments/add-comment for post 
// {
//     "advisorId": 1,
//     "studentId": "student1",
//     "content": "This is a comment from student1."
// } 
// add Bearer <token> for authorizations
router.post('/reply-comment', authenticateToken, authorizeRole(['ADVISOR', 'STUDENT']), commentController.replyToComment);
router.get(
    '/comments',
    authenticateToken,
    authorizeRole(['ADVISOR', 'STUDENT']),
    commentController.getComments
  );
// http://localhost:3000/comments/comments
// add Bearer <token> for authorizations
router.put('/comments/:id', authenticateToken, authorizeRole(['ADVISOR', 'STUDENT']), commentController.updateComment);
router.delete('/comments/:id', authenticateToken, authorizeRole(['ADVISOR']), commentController.deleteComment);

export default router;