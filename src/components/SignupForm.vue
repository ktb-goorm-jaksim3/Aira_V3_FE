<!-- SignupForm.vue -->
<template>
  <div class="signup-container">
    <h1>회원가입</h1>

    <!-- 닉네임 입력 필드 -->
    <div class="form-group">
      <label for="nickname">닉네임</label>
      <input
        type="text"
        v-model="nickname"
        id="nickname"
        placeholder="닉네임을 입력하세요"
      />
    </div>

    <!-- 이메일 입력 필드 -->
    <div class="form-group">
      <label for="email">이메일</label>
      <input
        type="email"
        v-model="email"
        id="email"
        placeholder="이메일을 입력하세요"
      />
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
      <div v-if="!isPasswordValid" class="error">
        *8자리 이상, 영어, 숫자, 특수문자를 포함해야 합니다
      </div>
    </div>

    <!-- 비밀번호 확인 필드 -->
    <div class="form-group">
      <label for="confirmPassword">비밀번호 확인</label>
      <input
        type="password"
        v-model="confirmPassword"
        id="confirmPassword"
        placeholder="비밀번호를 다시 입력하세요"
      />
      <div v-if="isPasswordMismatch" class="error">
        비밀번호가 일치하지 않습니다.
      </div>
    </div>

    <!-- 회원가입 버튼 -->
    <button
      class="signup-btn"
      :disabled="!isFormValid"
      @click="handleSignup"
    >
      회원가입
    </button>
  </div>
</template>

<script>
import { handleSignup } from "../api/api";

export default {
  data() {
    return {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    isPasswordValid() {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(this.password);
    },
    isPasswordMismatch() {
      return this.password !== this.confirmPassword && this.confirmPassword.length > 0;
    },
    isFormValid() {
      return (
        this.nickname &&
        this.email &&
        this.isPasswordValid &&
        !this.isPasswordMismatch
      );
    },
  },
  methods: {
    async handleSignup() {
      try {
        const result = await handleSignup(this.nickname, this.email, this.password);

        if (result.success) {
          alert("회원가입 성공!");
          // 입력 필드 초기화
          this.nickname = "";
          this.email = "";
          this.password = "";
          this.confirmPassword = "";
        } else {
          alert("회원가입 실패: " + result.message);
        }
      } catch (error) {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
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

.signup-btn {
  width: 100%;
  padding: 10px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.signup-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>