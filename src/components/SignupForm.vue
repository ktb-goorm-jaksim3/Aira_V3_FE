<!-- SignupForm.vue -->
<template>
  <div class="button-login">
    <button @click="goToLogin">로그인</button>
  </div>
  <div class="signup-page">
    <div class="signup-container">
      <!-- 로고 이미지 -->
      <img src="https://raw.githubusercontent.com/tkddk0108/image-for-Aira/main/Aira_logo.png" alt="Aira 로고" class="logo">
      <h1>회원가입</h1>

      <!-- 닉네임 입력 필드 -->
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input
          type="text"
          v-model="nickname"
          id="nickname"
          placeholder=""
        />
      </div>

      <!-- 이메일 입력 필드 -->
      <div class="form-group">
        <label for="email">이메일</label>
        <input
          type="email"
          v-model="email"
          id="email"
          placeholder=""
        />
      </div>

      <!-- 비밀번호 입력 필드 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder=""
        />
        <div class="error" :class="{ hidden: isPasswordValid }">
          *8자리 이상, 영어, 숫자, 특수문자 포함
        </div>
      </div>

      <!-- 비밀번호 확인 필드 -->
      <div class="form-group">
        <label for="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          placeholder=""
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
  </div>
</template>

<script>
import { handleSignup } from "../api/api.js";

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

          // 회원가입 성공 시 AiraIntro로 이동
          this.$router.push('/intro');
        } else {
          alert("회원가입 실패: " + result.message);
        }
      } catch (error) {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    },
    goToLogin() {
      this.$router.push('/login'); // 로그인 페이지로 이동
    },
  },
};
</script>

<style scoped>
.button-login {
  height: auto; /* 고정 높이를 제거 */
  padding: 0; /* 버튼 내부 위아래 여백 제거 */
  margin: 0; /* 버튼 외부 여백 제거 */
  background-color: #e8e8e8; /* 버튼 배경색 */
  text-align: left; /* 버튼 텍스트를 왼쪽 정렬 */
  position: fixed; /* 화면 상단에 고정 */
  top: 0; /* 페이지의 가장 위로 배치 */
  left: 0; /* 왼쪽에 정렬 */
  width: auto; /* 너비를 콘텐츠 크기에 맞춤 */
  padding: 10px 20px; /* 버튼 내부 좌우 여백 설정 */
  z-index: 1000; /* 다른 요소 위에 위치 */
}

.signup-page {
  background-color: #e8e8e8;
  min-height: calc(100vh - 5vh); /* 버튼 높이만큼 제외 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
/* 회원가입 컨테이너 스타일 */
.signup-container {
  max-width: 400px; /* 폼 최대 너비 설정 */
  background: transparent; /* 컨테이너 배경색을 투명으로 설정 */
  padding: 20px; /* 내부 여백 설정 */
  border-radius: 0px; /* 둥근 테두리 */
  box-shadow: none; /* 부드러운 그림자 */
  
}

/* 입력 그룹 스타일 */
.form-group {
  position: relative; /* 오류 메시지를 그룹 내에서 고정 */
  margin-bottom: 15px; /* 입력 그룹 아래 여백 추가 */
  min-height: 4.5rem; /* 오류 메시지를 위한 최소 높이 */
}

/* 제목 스타일 */
h1 {
  text-align: left; /* 텍스트를 중앙에 정렬 */
  margin-bottom: 30px; /* 제목 아래 여백 */
  color: #333; /* 제목 색상 */
  font-size: 1.7rem; /* 글자 크기 */
  font-weight: normal; /* 기본 글자 두께 */
}

/* 입력 필드 라벨 스타일 */
label {
  display: block; /* 라벨을 블록 요소로 설정 */
  margin-bottom: 5px; /* 라벨과 입력 필드 간 간격 */
  color: #555; /* 라벨 텍스트 색상 */
  font-size: 1rem; /* 라벨 글자 크기 */
}

/* 입력 필드 스타일 */
input {
  width: 100%; /* 입력 필드 너비를 컨테이너에 맞춤 */
  padding: 12px; /* 내부 여백 */
  border: 1px solid #e8e8e8; /* 테두리 색상 */
  border-radius: 0px; /* 모서리를 직각으로 설정 */
  font-size: 0.8rem; /* 글자 크기 */
  outline: none; /* 포커스 시 기본 외곽선 제거 */
  transition: border-color 0.3s; /* 테두리 색상 전환 효과 */
}

input:focus {
  border-color: #b6b5b5; /* 포커스 시 테두리 색상 */
}

/* 버튼 스타일 */
button {
    /* 버튼의 안쪽 여백 설정 (위아래 0.8rem, 좌우 2rem) */
    padding: 0.8rem 1rem;
    /* 글자 크기를 1rem으로 설정 */
    font-size: 0.8rem;
    /* 버튼 배경색을 파란색으로 설정 */
    background-color: #ccc;
    /* 버튼 텍스트 색상을 흰색으로 설정 */
    color: white;
    /* 버튼의 테두리를 제거 */
    border: none;
    /* 버튼의 모서리를 둥글게 설정 */
    border-radius: 0px;
    /* 커서를 클릭 가능하도록 설정 */
    cursor: pointer;
}


/* 로고 이미지 스타일 */
.logo {
    /* 로고 이미지의 너비 설정 */
    width: 50px;
    /* 이미지 비율 유지 */
    height: auto;
    /* 로고를 컨테이너 기준으로 오른쪽으로 이동 */
    margin: 0; 
}

/* 오류 메시지 스타일 */
.error {
  color: red; /* 오류 메시지 색상 */
  font-size: 0.8rem; /* 글자 크기 */
  margin-top: 5px; /* 위쪽 간격 */
  margin-left: 5px; /* 왼쪽 간격 */
  min-height: 1.2rem; /* 최소 높이 설정 */
  width: 100%; /* 부모 요소의 너비에 맞게 설정 */
  white-space: pre-wrap; /* 공백과 줄바꿈 유지 */
  overflow-wrap: break-word; /* 긴 텍스트 자동 줄바꿈 */
  box-sizing: border-box; /* 크기 계산에 테두리와 패딩 포함 */
}

/* 숨김 상태 스타일 */
.error.hidden {
  visibility: hidden; /* 요소를 보이지 않게 설정 */
  opacity: 0; /* 투명하게 설정 */
  height: 0; /* 높이를 0으로 설정 */
  overflow: hidden; /* 넘치는 내용을 숨김 */
  transition: visibility 0.3s, opacity 0.3s; /* 부드러운 전환 효과 */
}

/* 버튼 스타일 */
.signup-btn {
  width: 100%; /* 버튼 너비를 컨테이너에 맞춤 */
  padding: 12px; /* 내부 여백 */
  background: #525252; /* 버튼 배경색 */
  color: #fff; /* 버튼 텍스트 색상 */
  border: none; /* 테두리 제거 */
  border-radius: 0px; /* 모서리를 직각으로 설정 */
  font-size: 1rem; /* 글자 크기 */
  font-weight: bold; /* 굵은 글씨 */
  cursor: pointer; /* 클릭 가능한 커서 */
  transition: background-color 0.3s; /* 배경색 전환 효과 */
  align-items: center;
}

.signup-btn:disabled {
  background: #ccc; /* 비활성화된 버튼 배경색 */
  cursor: not-allowed; /* 클릭 불가 커서 */
}

.signup-btn:hover:not(:disabled) {
  background: #525252; /* 활성화된 버튼에 마우스를 올릴 때 배경색 변경 */
}
</style>