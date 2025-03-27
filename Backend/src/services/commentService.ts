import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const commentService = {
    addComment: async (
        senderId: string | number,
        content: string,
        senderRole: 'ADVISOR' | 'STUDENT',
        studentId?: string,
        advisorId?: number
    ) => {
        // Log the input parameters
        console.log('addComment called with:', {
            senderId,
            content,
            senderRole,
            studentId,
            advisorId,
        });

        if (!content || (senderRole === 'ADVISOR' && !studentId) || (senderRole === 'STUDENT' && !advisorId)) {
            throw new Error('Missing required fields: content, studentId, or advisorId');
        }

        const data: any = {
            content,
            senderRole,
        };

        if (senderRole === 'ADVISOR') {
            data.advisorId = senderId; // Set advisorId if the sender is an advisor
            data.studentId = studentId; // Associate the comment with a student
        } else if (senderRole === 'STUDENT') {
            data.studentId = senderId; // Set studentId if the sender is a student
            data.advisorId = advisorId; // Associate the comment with an advisor
        }

        // Log the data object before creating the comment
        console.log('Creating comment with data:', data);

        return await prisma.comment.create({ data });
    },
    replyToComment: async (commentId: number, senderId: string | number, content: string, senderRole: 'ADVISOR' | 'STUDENT') => {
        const parentComment = await prisma.comment.findUnique({ where: { id: commentId } });
        if (!parentComment) throw new Error('Parent comment not found');

        const data: any = {
            parentId: commentId,
            content,
            senderRole,
        };

        if (senderRole === 'ADVISOR') {
            data.advisorId = senderId; // Set advisorId if the sender is an advisor
        } else if (senderRole === 'STUDENT') {
            data.studentId = senderId; // Set studentId if the sender is a student
        }

        return await prisma.comment.create({ data });
    },
    getComments: async (userId: string, role: 'ADVISOR' | 'STUDENT') => {
        if (role === 'ADVISOR') {
            // Fetch comments for the advisor
            return await prisma.comment.findMany({
                where: {
                    advisorId: Number(userId),
                    parentId: null, // Only fetch top-level comments (topics)
                },
                include: {
                    student: true, // Include student details
                    advisor: true, // Include advisor details
                    replies: {
                        include: {
                            student: true, // Include student details for replies
                            advisor: true, // Include advisor details for replies
                        },
                    },
                },
            });
        } else if (role === 'STUDENT') {
            // Fetch comments for the student
            return await prisma.comment.findMany({
                where: {
                    studentId: userId,
                    parentId: null, // Only fetch top-level comments (topics)
                },
                include: {
                    advisor: true, // Include advisor details
                    student: true, // Include student details
                    replies: {
                        include: {
                            student: true, // Include student details for replies
                            advisor: true, // Include advisor details for replies
                        },
                    },
                },
            });
        }
        throw new Error('Invalid role');
    },
    updateComment: async (id: number, data: Partial<{ content: string }>) => {
        return await prisma.comment.update({
            where: { id },
            data,
        });
    },
    deleteComment: async (id: number) => {
        return await prisma.comment.delete({
            where: { id },
        });
    },
};
