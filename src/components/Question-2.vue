<!-- Question2 - 성실성 -->
<template>
  <div class="question">
    <!-- 질문 제목 -->
    <h2 class="question-title">Q2. 성실성</h2>
    
    <!-- 질문 본문 -->
    <p class="question-body">
      아이디어를 발전시키기 위해<br>
      얼마나 체계적으로 계획을<br>
      세우고 실행하나요?
    </p>
    
    <!-- 질문 아래 이미지 -->
    <img src="https://raw.githubusercontent.com/tkddk0108/image-for-Aira/main/Question2.png" alt="질문 관련 이미지" class="center-image">
    
      <!-- 옵션 리스트 -->
    <div class="options">
      <label>
        <input
          type="radio"
          name="option"
          value="1"
          v-model="answer" 
        />
        떠오르는 생각을<br />바로 실행에 옮겨요.
      </label>
      <label>
        <input
          type="radio"
          name="option"
          value="2"
          v-model="answer" 
        />
        아이디어 구체화<br />계획부터 세워요.
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
      this.$router.push('/question3'); // 다음 질문 페이지로 이동
    },
  },
};
</script>
