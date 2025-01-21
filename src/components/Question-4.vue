<!-- Question2 - 성실성 -->
<template>
  <div class="question">
    <!-- 질문 제목 -->
    <h2 class="question-title">Q4. 친화성</h2>
    
    <!-- 질문 본문 -->
    <p class="question-body">
      아이디어를 구상할 때<br>
      다른 사람들의 피드백을<br>
      얼마나 중요하게 생각하시나요?
    </p>
    
    <!-- 질문 아래 이미지 -->
    <img src="https://raw.githubusercontent.com/tkddk0108/image-for-Aira/main/Question4.png" alt="질문 관련 이미지" class="center-image">
    
      <!-- 옵션 리스트 -->
    <div class="options">
      <label>
        <input
          type="radio"
          name="option"
          value="1"
          v-model="answer" 
        />
        타인의 피드백을 수용하고<br />협력하는 과정을 즐겨요.
      </label>
      <label>
        <input
          type="radio"
          name="option"
          value="2"
          v-model="answer" 
        />
        타인의 의견보다 제 생각을<br />스스로 판단하는 편이예요.
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
      this.$router.push('/question5'); // 다음 질문 페이지로 이동
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