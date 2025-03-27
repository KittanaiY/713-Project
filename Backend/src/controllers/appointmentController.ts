import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { appointmentService } from '../services/appointmentService';

export const appointmentController = {
    createAppointment: async (req: AuthRequest, res: Response) => {
        const { subject, requestedDate, studentId, advisorId } = req.body;
        try {
            const appointment = await appointmentService.createAppointment({ subject, requestedDate, studentId, advisorId });
            res.status(201).json(appointment);
        } catch (error) {
            res.status(500).json({ error: 'Error creating appointment' });
        }
    },
    getAppointments: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id.toString();
            const role = req.user!.role;

            const appointments = await appointmentService.getAppointments(userId, role);
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching appointments' });
        }
    },
    updateAppointment: async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const appointment = await appointmentService.updateAppointment(Number(id), data);
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({ error: 'Error updating appointment' });
        }
    },
    confirmAppointment: async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        const { confirmedDate } = req.body;
        try {
            const appointment = await appointmentService.confirmAppointment(Number(id), new Date(confirmedDate));
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({ error: 'Error confirming appointment' });
        }
    },
    deleteAppointment: async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        try {
            await appointmentService.deleteAppointment(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error deleting appointment' });
        }
    },
};