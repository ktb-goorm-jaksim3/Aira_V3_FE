<!-- Question2 - 성실성 -->
<template>
  <div class="question">
    <!-- 질문 제목 -->
    <h2 class="question-title">Q5. 정서적 안정성</h2>
    
    <!-- 질문 본문 -->
    <p class="question-body">
      비판이나 실패가<br>
      아이디어 구상에 <br>
      얼마나 영향을 미치나요?
    </p>
    
    <!-- 질문 아래 이미지 -->
    <img src="https://raw.githubusercontent.com/tkddk0108/image-for-Aira/main/Question5.png" alt="질문 관련 이미지" class="center-image">
    
      <!-- 옵션 리스트 -->
    <div class="options">
      <label>
        <input
          type="radio"
          name="option"
          value="1"
          v-model="answer" 
        />
        침착하게 대처하고, <br />새로운 방법을 찾아 나가요.
      </label>
      <label>
        <input
          type="radio"
          name="option"
          value="2"
          v-model="answer" 
        />
        작은 문제나 비판에 스트레스를<br />받고 힘들어지곤해요.
      </label>
    </div>
    <button :disabled="!answer" @click="goToNext">다음으로</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: "", // 선택한 답변
    };
  },
  methods: {
    goToNext() {
      this.$router.push('/summary'); // 다음 질문 페이지로 이동
    },
  },
};
</script>

<style scoped>
/* Question4 전용 스타일 */
.center-image {
  width: 300px; /* 이미지 너비를 300px로 설정 */
}
</style>