import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { getAdvisorsSummary } from '../services/summaryService';

export const summaryController = {
    getAdvisorsSummary: async (req: AuthRequest, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        try {
            const summary = await getAdvisorsSummary(page, pageSize);
            res.status(200).json(summary);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching advisors summary' });
        }
    },
};