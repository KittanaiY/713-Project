import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { announcementService } from '../services/announcementService';

export const announcementController = {
    createAnnouncement: async (req: AuthRequest, res: Response) => {
        const { title, content, fileUrl, studentId, advisorId } = req.body;
        try {
            const announcement = await announcementService.createAnnouncement({ title, content, fileUrl, studentId, advisorId });
            res.status(201).json(announcement);
        } catch (error) {
            res.status(500).json({ error: 'Error creating announcement' });
        }
    },
    getAnnouncements: async (req: AuthRequest, res: Response) => {
        try {
            const announcements = await announcementService.getAnnouncements(req.user!.id.toString(), req.user!.role);
            res.status(200).json(announcements);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching announcements' });
        }
    },
    updateAnnouncement: async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const announcement = await announcementService.updateAnnouncement(Number(id), data);
            res.status(200).json(announcement);
        } catch (error) {
            res.status(500).json({ error: 'Error updating announcement' });
        }
    },
    deleteAnnouncement: async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        try {
            await announcementService.deleteAnnouncement(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error deleting announcement' });
        }
    },
};