import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { validateAdmin, validateAdvisor, validateStudent } from '../services/authService';

export const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET!;

// Unified login endpoint
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    let user;
    let role;
    let token;

    // Validate user credentials for each role
    user = await validateAdmin(username, password);
    if (user) {
      role = 'ADMIN';
      token = jwt.sign({ id: user.id, role }, SECRET_KEY, { expiresIn: '1h' });
    }

    if (!user) {
      user = await validateAdvisor(username, password);
      if (user) {
        role = 'ADVISOR';
        token = jwt.sign({ id: user.id, role }, SECRET_KEY, { expiresIn: '1h' });
      }
    }

    if (!user) {
      user = await validateStudent(username, password);
      if (user) {
        role = 'STUDENT';
        token = jwt.sign({ id: user.studentId, role }, SECRET_KEY, { expiresIn: '1h' });
      }
    }

    // If user is not found or credentials are invalid
    if (!user || !token) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Respond with user details and token
    res.json({ user, role, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};