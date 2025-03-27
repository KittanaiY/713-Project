import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: 'ADVISOR' | 'STUDENT';
        studentId?: string;
      };
    }
  }
}