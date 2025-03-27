import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { commentService } from '../services/commentService';

export const commentController = {
  addComment: async (req: AuthRequest, res: Response): Promise<void> => {
    const { studentId, content, advisorId } = req.body;
    try {
      const user = req.user!;
      const senderRole: 'ADVISOR' | 'STUDENT' = user.role;
      const senderId = senderRole === 'ADVISOR' ? user.id : user.studentId;

      if (!senderId || !content || (senderRole === 'ADVISOR' && !studentId) || (senderRole === 'STUDENT' && !advisorId)) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const comment = await commentService.addComment(senderId, content, senderRole, studentId, advisorId);
      res.status(201).json(comment);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Error adding comment' });
    }
  },
    replyToComment: async (req: AuthRequest, res: Response): Promise<void> => {
        const { commentId, content } = req.body;
        try {
            const user = req.user!;
            const senderRole: 'ADVISOR' | 'STUDENT' = user.role === 'ADVISOR' ? 'ADVISOR' : 'STUDENT';
            const senderId = senderRole === 'ADVISOR' ? user.id : user.studentId;

            if (!senderId) {
                res.status(400).json({ error: 'Sender ID is missing' });
                return;
            }

            const reply = await commentService.replyToComment(commentId, senderId, content, senderRole);
            res.status(201).json(reply);
        } catch (error) {
            res.status(500).json({ error: 'Error replying to comment' });
        }
    },
    getComments: async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user!.id.toString();
            const role = req.user!.role as 'ADVISOR' | 'STUDENT';
            const comments = await commentService.getComments(userId, role);
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching comments' });
        }
    },
    updateComment: async (req: AuthRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        const data = req.body;
        try {
            const comment = await commentService.updateComment(Number(id), data);
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ error: 'Error updating comment' });
        }
    },
    deleteComment: async (req: AuthRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            await commentService.deleteComment(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error deleting comment' });
        }
    },
};