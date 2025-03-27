import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createStudent() {
  try {
    const students = await Promise.all([
      prisma.student.create({
        data: {
          studentId: 'student1',
          firstName: 'Somchai',
          lastName: 'Sukjai',
          profilePicture: null,
          department: 'Computer Science',
          password: 'password123',
          role: 'STUDENT',
          advisor: {
            connect: { id: 1 }, // Advisor 1
          },
        },
      }),
      prisma.student.create({
        data: {
          studentId: 'student2',
          firstName: 'Somsri',
          lastName: 'Sukjai',
          profilePicture: null,
          department: 'Mathematics',
          password: 'password456',
          role: 'STUDENT',
          advisor: {
            connect: { id: 2 }, // Advisor 2
          },
        },
      }),
      prisma.student.create({
        data: {
          studentId: 'student3',
          firstName: 'Prasit',
          lastName: 'Sukjai',
          profilePicture: null,
          department: 'Physics',
          password: 'password789',
          role: 'STUDENT',
          advisor: {
            connect: { id: 1 }, // Advisor 1
          },
        },
      }),
      prisma.student.create({
        data: {
          studentId: 'student4',
          firstName: 'Anan',
          lastName: 'Sukjai',
          profilePicture: null,
          department: 'Chemistry',
          password: 'password101',
          role: 'STUDENT',
          advisor: {
            connect: { id: 2 }, // Advisor 2
          },
        },
      }),
      prisma.student.create({
        data: {
          studentId: 'student5',
          firstName: 'Suda',
          lastName: 'Sukjai',
          profilePicture: null,
          department: 'Biology',
          password: 'password102',
          role: 'STUDENT',
          advisor: {
            connect: { id: 1 }, // Advisor 1
          },
        },
      }),
    ]);

    console.log("Students created successfully!");
    console.log("Created students:", students);
    return students;
  } catch (error) {
    console.error("Error creating students:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}