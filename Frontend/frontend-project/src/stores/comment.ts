import { defineStore } from 'pinia';
import axios from 'axios';
import type { Comment } from '@/type';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [] as Comment[], // State to store all comments
  }),
  actions: {
    // Fetch all comments
    async fetchComments() {
        try {
          const response = await axios.get('http://localhost:3000/comments/comments', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
          console.log('Fetched comments:', response.data); // Debug the response
          this.comments = response.data as Comment[];
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      },

    // Add a new comment
    async addComment(data: { studentId: string; content: string }) {
      try {
        const response = await axios.post('http://localhost:3000/comments/add-comment', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.comments.push(response.data); // Add the new comment to the state
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },

    // Reply to a comment
    async replyToComment(data: { commentId: number; content: string; senderRole: 'ADVISOR' | 'STUDENT' }) {
        try {
          const response = await axios.post('http://localhost:3000/comments/reply-comment', data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
  
          // Update the comment in the state with the new reply
          const index = this.comments.findIndex((comment) => comment.id === data.commentId);
          if (index !== -1) {
            const reply = {
              ...response.data,
              senderRole: data.senderRole, // Add sender role to the reply
            };
            this.comments[index].replies = [...(this.comments[index].replies || []), reply];
          }
        } catch (error) {
          console.error('Error replying to comment:', error);
        }
      },

    // Update a comment
    async updateComment(id: number, data: { content: string }) {
      try {
        const response = await axios.put(`http://localhost:3000/comments/comments/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // Update the comment in the state
        const index = this.comments.findIndex((comment) => comment.id === id);
        if (index !== -1) {
          this.comments[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    },

    // Delete a comment
    async deleteComment(id: number) {
      try {
        await axios.delete(`http://localhost:3000/comments/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // Remove the comment from the state
        this.comments = this.comments.filter((comment) => comment.id !== id);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    },
    async fetchCommentsForAdvisor() {
        try {
          const response = await axios.get('http://localhost:3000/comments/comments', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
          console.log('Fetched comments for advisor:', response.data); // Debug the response
          this.comments = response.data as Comment[];
        } catch (error) {
          console.error('Error fetching comments for advisor:', error);
        }
      },
    async fetchCommentsForStudent() {
        try {
          const response = await axios.get('http://localhost:3000/comments/comments', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
          console.log('Fetched comments for student:', response.data); // Debug the response
          this.comments = response.data as Comment[];
        } catch (error) {
          console.error('Error fetching comments for student:', error);
        }
      },
  },
});