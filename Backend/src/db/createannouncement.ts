import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAnnouncement() {
  try {
    // Fetch students to get their advisor IDs
    const student1 = await prisma.student.findUnique({ where: { studentId: 'student1' } });
    const student2 = await prisma.student.findUnique({ where: { studentId: 'student2' } });
    const student3 = await prisma.student.findUnique({ where: { studentId: 'student3' } });

    if (!student1 || !student2 || !student3) {
      throw new Error('One or more students not found');
    }

    const announcements = await Promise.all([
      prisma.announcement.create({
        data: {
          title: 'First Announcement',
          content: 'This is the content of the first announcement.',
          fileUrl: 'http://example.com/file1.pdf',
          advisor: {
            connect: { id: student1.advisorId! }, // Connect to advisor of student1
          },
          student: {
            connect: { studentId: 'student1' }, // Connect to student1
          },
        },
      }),
      prisma.announcement.create({
        data: {
          title: 'Second Announcement',
          content: 'This is the content of the second announcement.',
          fileUrl: 'http://example.com/file2.pdf',
          advisor: {
            connect: { id: student2.advisorId! }, // Connect to advisor of student2
          },
          student: {
            connect: { studentId: 'student2' }, // Connect to student2
          },
        },
      }),
      prisma.announcement.create({
        data: {
          title: 'Third Announcement',
          content: 'This is the content of the third announcement.',
          fileUrl: 'http://example.com/file3.pdf',
          advisor: {
            connect: { id: student3.advisorId! }, // Connect to advisor of student3
          },
          student: {
            connect: { studentId: 'student3' }, // Connect to student3
          },
        },
      }),
    ]);

    console.log("Announcements created successfully!");
    console.log("Created announcements:", announcements);
    return announcements;
  } catch (error) {
    console.error("Error creating announcements:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}