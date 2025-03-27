import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const announcementService = {
    createAnnouncement: async (data: { title: string; content: string; fileUrl: string; studentId: string; advisorId: number }) => {
        return await prisma.announcement.create({
            data,
        });
    },
    getAnnouncements: async (userId: string, role: string) => {
        if (role === 'STUDENT') {
            return await prisma.announcement.findMany({
                where: { studentId: userId },
                include: { student: true, advisor: true }, // Include both student and advisor data
            });
        } else if (role === 'ADVISOR') {
            return await prisma.announcement.findMany({
                where: { advisorId: Number(userId) },
                include: { student: true, advisor: true }, // Include both student and advisor data
            });
        }
        return [];
    },
    updateAnnouncement: async (id: number, data: Partial<{ title: string; content: string; fileUrl: string }>) => {
        return await prisma.announcement.update({
            where: { id },
            data,
        });
    },
    deleteAnnouncement: async (id: number) => {
        return await prisma.announcement.delete({
            where: { id },
        });
    },
};