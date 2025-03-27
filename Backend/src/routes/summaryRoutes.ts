import { Router } from 'express';
import { summaryController } from '../controllers/summaryController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/advisors-summary', authenticateToken, authorizeRole(['ADMIN']), summaryController.getAdvisorsSummary);
// http://localhost:3000/summary/advisors-summary
export default router;