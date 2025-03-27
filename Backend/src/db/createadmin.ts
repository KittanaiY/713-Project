import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAdmin() {
  try {
    const admin = await prisma.admin.create({
      data: {
        username: 'admin1',
        password: 'adminpassword123',
        role: 'ADMIN',
      },
    });

    console.log("Admin created successfully!");
    console.log("Created admin:", admin);
    return admin;
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}