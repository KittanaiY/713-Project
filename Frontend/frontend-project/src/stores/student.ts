import { defineStore } from 'pinia';
import axios from 'axios';
import type { Student } from '@/type';

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [] as Student[], // State to store all students
    student: null as Student | null, // State to store a single student
  }),
  actions: {
    // Fetch all students
    async fetchStudents() {
      try {
        const response = await axios.get('http://localhost:3000/admin/students', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.students = response.data; // Populate the students array
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },
    async fetchStudentsFromAdvisor() {
      try {
        const response = await axios.get('http://localhost:3000/advisors/students', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.students = response.data; // Populate the students array
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },

    // Fetch a single student by ID
    async fetchStudentById(id: string) {
      try {
        const response = await axios.get(`http://localhost:3000/students/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.student = response.data;
      } catch (error) {
        console.error('Error fetching student by ID:', error);
      }
    },

    // Create a new student
    async createStudent(data: {
      studentId: string;
      firstName: string;
      lastName: string;
      department: string;
      password: string;
      advisorId: number;
    }) {
      try {
        const response = await axios.post('http://localhost:3000/students/create-student', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.students.push(response.data); // Add the new student to the state
        this.student = response.data; // Set the newly created student as the current student
      } catch (error) {
        console.error('Error creating student:', error);
      }
    },

    // Update a student
    async updateStudent(id: string, data: Partial<Student>) {
      try {
        const response = await axios.put(`http://localhost:3000/students/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // Update the student in the state
        const index = this.students.findIndex((student) => student.studentId === id);
        if (index !== -1) {
          this.students[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating student:', error);
      }
    },

    // Delete a student
    async deleteStudent(id: string) {
      try {
        await axios.delete(`http://localhost:3000/students/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // Remove the student from the state
        this.students = this.students.filter((student) => student.studentId !== id);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    },
  },
});