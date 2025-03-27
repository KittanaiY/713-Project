import { Router } from 'express';
import { announcementController } from '../controllers/announcementController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-announcement', authenticateToken, authorizeRole(['ADVISOR']), announcementController.createAnnouncement);
// http://localhost:3000/announcements/create-announcement
// {
//     "title": "New Announcement",
//     "content": "This is the content of the announcement.",
//     "fileUrl": "http://example.com/file.pdf",
//     "studentId": "student2",
//     "advisorId": 2
// }
router.get('/announcements', authenticateToken, authorizeRole(['ADVISOR', 'STUDENT']), announcementController.getAnnouncements);
// http://localhost:3000/announcements/announcements
router.put('/announcements/:id', authenticateToken, authorizeRole(['ADVISOR']), announcementController.updateAnnouncement);
// http://localhost:3000/announcements/announcements/{announcementId}
// {
//     "title": "Updated Announcement Title",
//     "content": "This is the updated content of the announcement.",
//     "fileUrl": "http://example.com/updated-file.pdf"
// }
router.delete('/announcements/:id', authenticateToken, authorizeRole(['ADVISOR']), announcementController.deleteAnnouncement);

export default router;