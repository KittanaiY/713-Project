import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAdvisorsSummary = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const advisors = await prisma.advisor.findMany({
        skip,
        take: pageSize,
        include: {
            students: true,
            appointments: true,
        },
    });

    const totalAdvisors = await prisma.advisor.count();

    const summary = advisors.map(advisor => ({
        id: advisor.id,
        username: advisor.username,
        firstName: advisor.firstName,
        lastName: advisor.lastName,
        department: advisor.department,
        position: advisor.position,
        studentCount: advisor.students.length,
        appointments: advisor.appointments.map(appointment => ({
            id: appointment.id,
            subject: appointment.subject,
            requestedDate: appointment.requestedDate,
            confirmedDate: appointment.confirmedDate,
            status: appointment.status,
            studentId: appointment.studentId,
        })),
    }));

    return {
        totalAdvisors,
        totalPages: Math.ceil(totalAdvisors / pageSize),
        currentPage: page,
        advisors: summary,
    };
};