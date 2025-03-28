<template>
  <div class="add-comment-container">
    <div class="comment-box">
      <h2>Add Comment</h2>
      <form @submit.prevent="submitForm" class="comment-form">
        <div class="form-group">
          <label for="senderId">Sender ID:</label>
          <p id="senderId" class="readonly-field">{{ senderId }}</p>
        </div>
        <div class="form-group">
          <label for="studentId">Student ID:</label>
          <p id="studentId" class="readonly-field">{{ studentId }}</p>
        </div>
        <div class="form-group">
          <label for="advisorId">Advisor ID:</label>
          <p id="advisorId" class="readonly-field">{{ advisorId }}</p>
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea id="content" v-model="content" required></textarea>
        </div>
        <button type="submit" class="submit-button">Add Comment</button>
      </form>
      <h2>Your Comments</h2>
      <table class="comments-table" v-if="comments.length > 0">
        <thead>
          <tr>
            <th>Advisor ID</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in comments" :key="comment.id" class="comment-row">
            <td>{{ comment.advisorId }}</td>
            <td>{{ comment.content }}</td>
            <td>
              <button @click="deleteComment(comment.id)" class="delete-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No comments found. Add your first comment!</p>
      <button @click="returnToDashboard" class="return-button">Return to Student Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoginStore } from '@/stores/login'; // Import the login store
import type { Student } from '@/type'; // Import the Student type

const loginStore = useLoginStore(); // Access the login store
const router = useRouter();

// Explicitly check the role of the user and extract studentId and advisorId
const studentId = ref<string>('');
const advisorId = ref<number | null>(null);

if (loginStore.user?.role === 'STUDENT') {
  const student = loginStore.user as Student;
  studentId.value = student.studentId;
  advisorId.value = student.advisorId;
}

const content = ref('');
interface Comment {
  id: number;
  advisorId: string;
  content: string;
}

const comments = ref<Comment[]>([]);

const fetchComments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/comments/comments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    comments.value = response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    alert('Failed to fetch comments.');
  }
};

const submitForm = async () => {
  if (!advisorId.value || !content.value) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:3000/comments/add-comment',
      {
        senderId: studentId.value,
        studentId: studentId.value,
        advisorId: advisorId.value,
        content: content.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    comments.value.push(response.data);
    alert('Comment added successfully');
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
    comments.value = comments.value.filter((comment) => comment.id !== id);
    alert('Comment deleted successfully');
  } catch (error) {
    console.error('Error deleting comment:', error);
    alert('Failed to delete comment');
  }
};

const returnToDashboard = () => {
  router.push('/student/dashboard');
};

onMounted(() => {
  fetchComments();
});
</script>

<style scoped>
/* Reuse the styles from AdvisorComp AddComment.vue */
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

textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.readonly-field {
  background-color: #f9f9f9;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #555;
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