<!-- Loginform.vue -->
<template>
  <div class="login-container">
    <h1>로그인</h1>

    <!-- 이메일 입력 필드 -->
    <div class="form-group">
      <label for="email">이메일</label>
      <input
        type="email"
        v-model="email"
        id="email"
        placeholder="이메일을 입력하세요"
      />
      <div v-if="!isEmailValid" class="error">
        유효한 이메일 주소를 입력하세요.
      </div>
    </div>

    <!-- 비밀번호 입력 필드 -->
    <div class="form-group">
      <label for="password">비밀번호</label>
      <input
        type="password"
        v-model="password"
        id="password"
        placeholder="비밀번호를 입력하세요"
      />
    </div>

    <!-- 로그인 버튼 -->
    <button
      class="login-btn"
      :disabled="!isFormValid"
      @click="handleLogin"
    >
      로그인
    </button>
  </div>
</template>

<script>
import { handleLogin } from "../api/api";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    // 이메일 유효성 검사
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    // 폼 유효성 검사
    isFormValid() {
      return this.email && this.password && this.isEmailValid;
    },
  },
  methods: {
    async handleLogin() {
      try {
        // API 호출
        const result = await handleLogin(this.email, this.password);

        if (result.success) {
          alert("로그인 성공!");
          console.log("서버로부터 받은 토큰:", result.data.access_token);

          // 입력 필드 초기화
          this.email = "";
          this.password = "";
        } else {
          // result.message가 객체일 경우 detail 추출
          const errorMessage =
            typeof result.message === "object" && result.message.detail
              ? result.message.detail
              : result.message;

          alert("로그인 실패: " + errorMessage);
        }
      } catch (error) {
        alert("로그인 처리 중 오류가 발생했습니다.");
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 95%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>