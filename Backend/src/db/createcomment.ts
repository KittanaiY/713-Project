import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createComment() {
  try {
    // Create 5 comments
    const comments = await Promise.all([
      prisma.comment.create({
        data: {
          content: 'This is the first comment from student1.',
          senderRole: 'STUDENT', // Sender is a student
          student: {
            connect: { studentId: 'student1' }, // Connect to student1
          },
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
        },
      }),
      prisma.comment.create({
        data: {
          content: 'This is the second comment from advisor1.',
          senderRole: 'ADVISOR', // Sender is an advisor
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
          student: {
            connect: { studentId: 'student2' }, // Connect to student2
          },
        },
      }),
      prisma.comment.create({
        data: {
          content: 'This is the third comment from student3.',
          senderRole: 'STUDENT', // Sender is a student
          student: {
            connect: { studentId: 'student3' }, // Connect to student3
          },
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
        },
      }),
      prisma.comment.create({
        data: {
          content: 'This is the fourth comment from advisor2.',
          senderRole: 'ADVISOR', // Sender is an advisor
          advisor: {
            connect: { id: 2 }, // Connect to advisor2
          },
          student: {
            connect: { studentId: 'student4' }, // Connect to student4
          },
        },
      }),
      prisma.comment.create({
        data: {
          content: 'This is the fifth comment from student5.',
          senderRole: 'STUDENT', // Sender is a student
          student: {
            connect: { studentId: 'student5' }, // Connect to student5
          },
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
        },
      }),
    ]);

    // Create replies for each comment
    const replies = await Promise.all([
      prisma.comment.create({
        data: {
          content: 'This is a reply to the first comment from advisor1.',
          senderRole: 'ADVISOR', // Sender is an advisor
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
          student: {
            connect: { studentId: 'student1' }, // Connect to student1
          },
          parent: {
            connect: { id: comments[0].id }, // Connect to the first comment
          },
        },
      }),
      prisma.comment.create({
        data: {
          content: 'This is a reply to the second comment from student2.',
          senderRole: 'STUDENT', // Sender is a student
          student: {
            connect: { studentId: 'student2' }, // Connect to student2
          },
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
          parent: {
            connect: { id: comments[1].id }, // Connect to the second comment
          },
        },
      }),
      prisma.comment.create({
        data: {
          content: 'This is a reply to the third comment from advisor1.',
          senderRole: 'ADVISOR', // Sender is an advisor
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
          student: {
            connect: { studentId: 'student3' }, // Connect to student3
          },
          parent: {
            connect: { id: comments[2].id }, // Connect to the third comment
          },
        },
      }),
      prisma.comment.create({
        data: {
          content: 'This is a reply to the fourth comment from student4.',
          senderRole: 'STUDENT', // Sender is a student
          student: {
            connect: { studentId: 'student4' }, // Connect to student4
          },
          advisor: {
            connect: { id: 2 }, // Connect to advisor2
          },
          parent: {
            connect: { id: comments[3].id }, // Connect to the fourth comment
          },
        },
      }),
      prisma.comment.create({
        data: {
          content: 'This is a reply to the fifth comment from advisor1.',
          senderRole: 'ADVISOR', // Sender is an advisor
          advisor: {
            connect: { id: 1 }, // Connect to advisor1
          },
          student: {
            connect: { studentId: 'student5' }, // Connect to student5
          },
          parent: {
            connect: { id: comments[4].id }, // Connect to the fifth comment
          },
        },
      }),
    ]);

    console.log("Comments and replies created successfully!");
    console.log("Created comments:", comments);
    console.log("Created replies:", replies);
    return { comments, replies };
  } catch (error) {
    console.error("Error creating comments and replies:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}