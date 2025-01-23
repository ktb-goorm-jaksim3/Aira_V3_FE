<!-- Summary.vue -->
<template>
    <div class="summary">
      <h2>요약</h2>
      <p>{{ summary }}</p>
      <button @click="goToChat">채팅으로 이동</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        summary: '요약을 생성 중입니다...',
      };
    },
    created() {
      this.fetchSummary();
    },
    methods: {
      async fetchSummary() {
        try {
          const response = await axios.post('/generate/', {
            answers: [/* 사용자 답변 데이터 */],
          });
          this.summary = response.data.summary;
        } catch (error) {
          this.summary = '요약을 가져오는 데 실패했습니다.';
        }
      },
      goToChat() {
        this.$router.push('/chat');
      },
    },
  };
  </script>

<style>
.summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #222;
}
.description {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 2rem;
  text-align: center;
}
.btn {
  padding: 0.8rem 2rem;
  font-size: 1rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #218838;
}
</style>