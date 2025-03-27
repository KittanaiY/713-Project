import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const adminService = {
    createAdmin: async (data: { username: string; password: string; role?: string }) => {
        return await prisma.admin.create({
            data,
        });
    },
    getAdmins: async () => {
        return await prisma.admin.findMany(); // Fetch all admins
    },
    updateAdmin: async (id: number, data: Partial<{ username: string; password: string; role: string }>) => {
        return await prisma.admin.update({
            where: { id },
            data,
        });
    },
    deleteAdmin: async (id: number) => {
        return await prisma.admin.delete({
            where: { id },
        });
    },
    createAdvisor: async (data: { username: string; password: string; firstName: string; lastName: string; department: string; position: string; role?: string }) => {
        return await prisma.advisor.create({
            data: {
                ...data,
                role: data.role || 'ADVISOR', // Default role to ADVISOR
            },
        });
    },
    getAdvisors: async () => {
        return await prisma.advisor.findMany();
    },
    updateAdvisor: async (id: number, data: Partial<{ username: string; password: string; firstName: string; lastName: string; department: string; position: string; role: string }>) => {
        return await prisma.advisor.update({
            where: { id },
            data,
        });
    },
    deleteAdvisor: async (id: number) => {
        return await prisma.advisor.delete({
            where: { id },
        });
    },
    createStudent: async (data: { studentId: string; firstName: string; lastName: string; department: string; password: string; advisorId: number; role?: string }) => {
        return await prisma.student.create({
            data: {
                ...data,
                role: data.role || 'STUDENT', // Default role to STUDENT
            },
        });
    },
    getStudents: async () => {
        return await prisma.student.findMany();
    },
    updateStudent: async (studentId: string, data: Partial<{ firstName: string; lastName: string; department: string; password: string; advisorId: number; role: string }>) => {
        return await prisma.student.update({
            where: { studentId },
            data,
        });
    },
    deleteStudent: async (studentId: string) => {
        return await prisma.student.delete({
            where: { studentId },
        });
    },
    searchStudents: async (studentId: string, firstName: string, lastName: string) => {
        return await prisma.student.findMany({
            where: {
                OR: [
                    { studentId: { contains: studentId, mode: "insensitive" } },
                    { firstName: { contains: firstName, mode: "insensitive" } },
                    { lastName: { contains: lastName, mode: "insensitive" } },
                ],
            },
        });
    },
};