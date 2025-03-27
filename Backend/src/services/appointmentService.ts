import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const appointmentService = {
  createAppointment: async (data: { subject: string; requestedDate: Date; studentId: string; advisorId: number }) => {
    return await prisma.appointment.create({
      data,
    });
  },
  getAppointments: async (userId: string, role: string) => {
    if (role === 'STUDENT') {
      // Fetch appointments for the student
      return await prisma.appointment.findMany({
        where: { studentId: userId },
      });
    } else if (role === 'ADVISOR') {
      // Fetch appointments for the advisor
      return await prisma.appointment.findMany({
        where: { advisorId: Number(userId) },
      });
    }
    return [];
  },
  updateAppointment: async (id: number, data: Partial<{ subject: string; requestedDate: Date; confirmedDate: Date; status: string }>) => {
    return await prisma.appointment.update({
      where: { id },
      data,
    });
  },
  confirmAppointment: async (id: number, confirmedDate: Date) => {
    return await prisma.appointment.update({
      where: { id },
      data: {
        confirmedDate,
        status: 'CONFIRMED',
      },
    });
  },
  deleteAppointment: async (id: number) => {
    return await prisma.appointment.delete({
      where: { id },
    });
  },
};