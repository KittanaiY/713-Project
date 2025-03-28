<template>
  <div class="add-comment-container">
    <div class="comment-box">
      <h2>Add Comment</h2>
      <form @submit.prevent="submitForm" class="comment-form">
        <div class="form-group">
          <label for="studentId">Student ID:</label>
          <select id="studentId" v-model="studentId" required>
            <option value="" disabled>Select a student</option>
            <option v-for="student in students" :key="student.studentId" :value="student.studentId">
              {{ student.firstName }} {{ student.lastName }} ({{ student.studentId }})
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea id="content" v-model="content" required></textarea>
        </div>
        <button type="submit" class="submit-button">Add Comment</button>
      </form>
      <h2>Your Comments</h2>
      <table class="comments-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in comments" :key="comment.id" class="comment-row">
            <td>{{ comment.studentId }}</td>
            <td>{{ comment.content }}</td>
            <td>
              <button @click="deleteComment(comment.id)" class="delete-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="returnToDashboard" class="return-button">Return to Advisor Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Student, Comment } from '@/type'; // Import the Student and Comment types

const studentId = ref<string>(''); // Ref for selected student ID
const content = ref<string>(''); // Ref for comment content
const students = ref<Student[]>([]); // Explicitly define the type as an array of Student
const comments = ref<Comment[]>([]); // Explicitly define the type as an array of Comment
const router = useRouter();

const fetchStudents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/advisors/students', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    students.value = response.data; // Populate the students list
  } catch (error) {
    console.error('Error fetching students:', error);
    alert('Failed to fetch students.');
  }
};

const fetchComments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/comments/comments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    comments.value = response.data; // Populate the comments list
  } catch (error) {
    console.error('Error fetching comments:', error);
    alert('Failed to fetch comments.');
  }
};

const submitForm = async () => {
  try {
    const response = await axios.post(
      'http://localhost:3000/comments/add-comment',
      {
        studentId: studentId.value,
        content: content.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    comments.value.push(response.data); // Add the new comment to the list
    alert('Comment added successfully');
    studentId.value = '';
    content.value = '';
  } catch (error) {
    console.error('Error adding comment:', error);
    alert('Failed to add comment');
  }
};

const deleteComment = async (id: number) => {
  try {
    await axios.delete(`http://localhost:3000/comments/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    comments.value = comments.value.filter((comment) => comment.id !== id); // Remove the deleted comment
    alert('Comment deleted successfully');
  } catch (error) {
    console.error('Error deleting comment:', error);
    alert('Failed to delete comment');
  }
};

const returnToDashboard = () => {
  router.push('/advisor/dashboard'); // Navigate back to the dashboard
};

onMounted(() => {
  fetchStudents(); // Fetch students when the component is mounted
  fetchComments(); // Fetch comments when the component is mounted
});
</script>

<style scoped>
/* Reuse the styles from StudentComp AddComment.vue */
.add-comment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 1rem;
}

.comment-box {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
}

.comment-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.comments-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #555;
}

.comment-row:hover {
  background-color: #f9f9f9;
}

.delete-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}

.return-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.return-button:hover {
  background-color: #5a6268;
}
</style>