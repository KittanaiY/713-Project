import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerStudent = async (data: { studentId: string; firstName: string; lastName: string; profilePicture?: string; department: string; password: string; advisorId: string }) => {
    return await prisma.student.create({
        data: {
            studentId: data.studentId,
            firstName: data.firstName,
            lastName: data.lastName,
            profilePicture: data.profilePicture,
            department: data.department,
            password: data.password,
            advisor: {
                connect: { id: Number(data.advisorId) }
            }
        },
    });
};