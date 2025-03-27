import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { registerStudent } from '../services/registerService';

export const registerController = {
    registerStudent: async (req: AuthRequest, res: Response) => {
        const { studentId, firstName, lastName, profilePicture, department, password, advisorId } = req.body;
        try {
            const student = await registerStudent({
                studentId, firstName, lastName, profilePicture, department, password, advisorId
            });
            res.status(201).json(student);
        } catch (error) {
            res.status(500).json({ error: 'Error registering student' });
        }
    },
};