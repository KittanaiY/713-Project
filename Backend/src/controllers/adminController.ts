import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { adminService } from '../services/adminService';

export const adminController = {
    createAdmin: async (req: AuthRequest, res: Response) => {
        const { username, password, role } = req.body;
        try {
            const admin = await adminService.createAdmin({ username, password, role });
            res.status(201).json(admin);
        } catch (error) {
            res.status(500).json({ error: 'Error creating admin' });
        }
    },
    getAdmins: async (req: AuthRequest, res: Response) => {
        try {
          const admins = await adminService.getAdmins();
          res.status(200).json(admins);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching admins' });
        }
      },
    updateAdmin: async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const admin = await adminService.updateAdmin(Number(id), data);
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json({ error: 'Error updating admin' });
        }
    },
    deleteAdmin: async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        try {
            await adminService.deleteAdmin(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error deleting admin' });
        }
    },
    createAdvisor: async (req: AuthRequest, res: Response) => {
        const { username, password, firstName, lastName, department, position, role } = req.body;
        try {
            const advisor = await adminService.createAdvisor({ username, password, firstName, lastName, department, position, role });
            res.status(201).json(advisor);
        } catch (error) {
            res.status(500).json({ error: 'Error creating advisor' });
        }
    },
    getAdvisors: async (req: AuthRequest, res: Response) => {
        try {
          const advisors = await adminService.getAdvisors();
          res.status(200).json(advisors);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching advisors' });
        }
      },
    updateAdvisor: async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const advisor = await adminService.updateAdvisor(Number(id), data);
            res.status(200).json(advisor);
        } catch (error) {
            res.status(500).json({ error: 'Error updating advisor' });
        }
    },
    deleteAdvisor: async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        try {
            await adminService.deleteAdvisor(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error deleting advisor' });
        }
    },
    createStudent: async (req: AuthRequest, res: Response) => {
        const { studentId, firstName, lastName, department, password, advisorId, role } = req.body;
        try {
            const student = await adminService.createStudent({ studentId, firstName, lastName, department, password, advisorId, role });
            res.status(201).json(student);
        } catch (error) {
            res.status(500).json({ error: 'Error creating student' });
        }
    },
    getStudents: async (req: AuthRequest, res: Response) => {
        try {
          const students = await adminService.getStudents();
          res.status(200).json(students);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching students' });
        }
      },
    updateStudent: async (req: AuthRequest, res: Response) => {
        const { studentId } = req.params;
        const data = req.body;
        try {
            const student = await adminService.updateStudent(studentId, data);
            res.status(200).json(student);
        } catch (error) {
            res.status(500).json({ error: 'Error updating student' });
        }
    },
    deleteStudent: async (req: AuthRequest, res: Response) => {
        const { studentId } = req.params;
        try {
            await adminService.deleteStudent(studentId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error deleting student' });
        }
    },
    searchStudents: async (req: AuthRequest, res: Response) => {
        const { studentId, firstName, lastName } = req.query;
        try {
            const students = await adminService.searchStudents(studentId as string, firstName as string, lastName as string);
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ error: 'Error searching students' });
        }
    },
};