<template>
  <div class="comments-container">
    <h2>Comments</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <p><strong>Comment:</strong> {{ comment.content }}</p>
        <p><strong>Comment By:</strong>
          {{ comment.senderRole === 'STUDENT' ? comment.student?.firstName + ' ' + comment.student?.lastName : comment.advisor?.firstName + ' ' + comment.advisor?.lastName }}
        </p>
        <ul v-if="comment.replies && comment.replies.length" class="replies-list">
          <li v-for="reply in comment.replies" :key="reply.id" class="reply-item">
            <p><strong>Reply:</strong> {{ reply.content }}</p>
            <p><strong>Reply From:</strong>
              {{ reply.senderRole === 'STUDENT' ? reply.student?.firstName + ' ' + reply.student?.lastName : reply.advisor?.firstName + ' ' + reply.advisor?.lastName }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <button class="back-button" @click="goToDashboard">Return to Advisor Dashboard</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCommentStore } from '@/stores/comment';
import { useLoginStore } from '@/stores/login';

const router = useRouter();
const commentStore = useCommentStore();
const loginStore = useLoginStore();
const comments = ref(commentStore.comments);

// Get the current advisor's ID from the login store
const currentAdvisorId = loginStore.token ? loginStore.user?.id : null;

const fetchComments = async () => {
  await commentStore.fetchCommentsForAdvisor(); // Fetch comments for the logged-in advisor
  comments.value = commentStore.comments; // Sync with store
};

const goToDashboard = () => {
  router.push('/advisor/dashboard'); // Redirect to the advisor dashboard
};

onMounted(fetchComments);
</script>

<style scoped>
.comments-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comments-container h2 {
  margin-bottom: 12px;
  font-size: 1.5rem;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.replies-list {
  margin-top: 10px;
  padding-left: 20px;
}

.reply-item {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f7f7f7;
}

.back-button {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>