import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAdvisor() {
  try {
    const advisors = await Promise.all([
      prisma.advisor.create({
        data: {
          username: 'advisor1',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
          profilePicture: null,
          department: 'Computer Science',
          position: 'Professor',
          role: 'ADVISOR',
        },
      }),
      prisma.advisor.create({
        data: {
          username: 'advisor2',
          password: 'password456',
          firstName: 'Jane',
          lastName: 'Smith',
          profilePicture: null,
          department: 'Mathematics',
          position: 'Associate Professor',
          role: 'ADVISOR',
        },
      }),
    ]);

    console.log("Advisors created successfully!");
    console.log("Created advisors:", advisors);
    return advisors;
  } catch (error) {
    console.error("Error creating advisors:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}