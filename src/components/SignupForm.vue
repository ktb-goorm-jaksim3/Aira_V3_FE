<template>
    <!-- 회원가입 화면의 전체 컨테이너 -->
    <div class="signup-container">
      <!-- 화면 제목 -->
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
          *8자리 이상 입력이 필요합니다
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
        return this.password.length >= 8;
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
      handleSignup() {
        alert("회원가입 요청이 전송되었습니다!");
        this.nickname = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
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