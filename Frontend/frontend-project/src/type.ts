export interface Admin {
    id: number;
    username: string;
    password: string;
    role: string;
  }
  
export interface Advisor {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    department: string;
    position: string;
    role: string;
    students: Student[];
    comments: Comment[];
    announcements: Announcement[];
    appointments: Appointment[];
  }
  
export interface Student {
    studentId: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    department: string;
    password: string;
    role: string;
    advisorId: number;
    advisor: Advisor;
    comments: Comment[];
    announcements: Announcement[];
    appointments: Appointment[];
  }
  
export interface Comment {
    id: number;
    content: string;
    studentId: string;
    student: Student;
    advisorId: number;
    advisor: Advisor;
    parentId?: number;
    parent?: Comment;
    replies: Comment[];
    senderRole: 'STUDENT' | 'ADVISOR'; // Added to match the schema
}
  
export interface Announcement {
    id: number;
    title: string;
    content: string;
    fileUrl: string;
    advisorId: number;
    advisor: Advisor;
    studentId: string;
    student: Student;
    createdAt: Date;
  }
  
export interface Appointment {
    id: number;
    subject: string;
    requestedDate: Date;
    confirmedDate?: Date;
    status: string;
    studentId: string;
    student: Student;
    advisorId: number;
    advisor: Advisor;
  }

export interface AdminState {
    admins: Admin[]; // Array of admins
    admin: Admin | null; // Single admin for detailed view or creation
  }

export interface AdvisorState {
    advisors: Advisor[]; // Array of advisors
    advisor: Advisor | null; // Single advisor for detailed view or creation
  }

export interface CommentState {
    comments: Comment[]; // Array of comments
  }
  
export interface CommentState {
    comments: Comment[]; // Array of comments
  }

export interface LoginState {
    token: string | null; // JWT token
    role: string | null;  // User role (ADMIN, ADVISOR, STUDENT)
  }