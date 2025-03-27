import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAppointment() {
  try {
    const appointments = await Promise.all([
      prisma.appointment.create({
        data: {
          subject: 'First Appointment',
          requestedDate: new Date('2025-03-20T10:00:00Z'),
          student: {
            connect: { studentId: 'student1' }, // Connect to student1
          },
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
        },
      }),
      prisma.appointment.create({
        data: {
          subject: 'Second Appointment',
          requestedDate: new Date('2025-03-21T11:00:00Z'),
          student: {
            connect: { studentId: 'student2' }, // Connect to student2
          },
          advisor: {
            connect: { id: 2 }, // Connect to advisor2
          },
        },
      }),
      prisma.appointment.create({
        data: {
          subject: 'Third Appointment',
          requestedDate: new Date('2025-03-22T12:00:00Z'),
          student: {
            connect: { studentId: 'student3' }, // Connect to student3
          },
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
        },
      }),
    ]);

    console.log("Appointments created successfully!");
    console.log("Created appointments:", appointments);
    return appointments;
  } catch (error) {
    console.error("Error creating appointments:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}