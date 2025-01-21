<!-- Question1 - 개방성 -->
 <template>
    <div class="question">
      <!-- 질문 제목 -->
      <h2 class="question-title">Q1. 개방성</h2>
      
      <!-- 질문 본문 -->
      <p class="question-body">
        새로운 아이디어를 생각할 때<br>
        당신은 얼마나 독창적인<br>
        접근 방식을 선호하시나요?
      </p>
      
      <!-- 질문 아래 이미지 -->
      <img src="https://raw.githubusercontent.com/tkddk0108/image-for-Aira/main/Question1.png" alt="질문 관련 이미지" class="center-image">
      
        <!-- 옵션 리스트 -->
      <div class="options">
        <label>
          <input
            type="radio"
            name="option"
            value="1"
            v-model="answer" 
          />
          검증된 방법이<br />효과적인 것 같아요.
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="2"
            v-model="answer" 
          />
          창의적인 방법<br />찾는 걸 좋아해요.
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
        this.$router.push('/question2'); // 다음 질문 페이지로 이동
      },
    },
  };
  </script>
 