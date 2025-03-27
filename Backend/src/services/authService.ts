import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const validateStudent = async (username: string, password: string) => {
  const student = await prisma.student.findUnique({
    where: { studentId: username },
  });
  if (student && student.password === password) {
    return student;
  }
  return null;
};

export const validateAdvisor = async (username: string, password: string) => {
  const advisor = await prisma.advisor.findUnique({
    where: { username },
  });
  if (advisor && advisor.password === password) {
    return advisor;
  }
  return null;
};

export const validateAdmin = async (username: string, password: string) => {
  const admin = await prisma.admin.findUnique({
    where: { username },
  });
  if (admin && admin.password === password) {
    return admin;
  }
  return null;
};