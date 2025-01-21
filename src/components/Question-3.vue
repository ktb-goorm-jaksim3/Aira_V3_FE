<!-- Question3 - 외향성 -->
<template>
  <div class="question">
    <!-- 질문 제목 -->
    <h2 class="question-title">Q3. 외향성</h2>
    
    <!-- 질문 본문 -->
    <p class="question-body">
      아이디어를 발전시키기 위해<br>
      다른 사람들과의 협업이나 <br>
      브레인스토밍을 선호하시나요?
    </p>
    
    <!-- 질문 아래 이미지 -->
    <img src="https://raw.githubusercontent.com/tkddk0108/image-for-Aira/main/Question3.png" alt="질문 관련 이미지" class="center-image">
    
      <!-- 옵션 리스트 -->
    <div class="options">
      <label>
        <input
          type="radio"
          name="option"
          value="1"
          v-model="answer" 
        />
       혼자 생각할 때 아이디어 <br />발전에 더 효과적이에요.
      </label>
      <label>
        <input
          type="radio"
          name="option"
          value="2"
          v-model="answer" 
        />
        사람들과 나누고 협업하면 <br />좋은 생각이 떠올라요.
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
      this.$router.push('/question4'); // 다음 질문 페이지로 이동
    },
  },
};
</script>

<style scoped>
/* Question3 전용 스타일 */
.center-image {
  width: 400px; /* 이미지 너비를 300px로 설정 */
}
</style>