<!-- LoginForm.vue -->
<template>
  <div class="button-signup">
    <button @click="goToSignup">회원가입</button>
  </div>
  <div class="login-page">
    <div class="login-container">
      <!-- 로고 이미지 -->
      <img src="https://raw.githubusercontent.com/tkddk0108/image-for-Aira/main/Aira_logo.png" alt="Aira 로고" class="logo">
  
      <h1>로그인</h1>

      <!-- 이메일 입력 필드 -->
      <div class="form-group">
        <label for="email">이메일</label>
        <input
          type="email"
          v-model="email"
          id="email"
          placeholder=""
        />
        <div v-if="!isEmailValid" class="error">
          * 유효한 이메일 주소를 입력하세요.
        </div>
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
      </div>

      <!-- 로그인 버튼 -->
      <button class="login-btn" :disabled="!isFormValid" @click="handleLogin">
        로그인
      </button>
    </div>
  </div>
</template>

<script>
import { handleLogin } from "../api/api.js";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    isFormValid() {
      return this.isEmailValid && this.password.length > 0;
    },
  },
  methods: {
    async handleLogin() {
      try {
        const result = await handleLogin(this.email, this.password);

        if (result.success) {
          localStorage.setItem('token', result.data.access_token); // 토큰 저장 
          // 현재 이 방식은 웹 브라우저에
          // 영구적으로 데이터를 저장하는 방식으로 보안적인 취약점이 존재 변경 필요하지만 일단 개발 먼저 수행 예정.
          // 이러한 이유로 session storage 고려해야함.
          alert("로그인 성공!");
          this.$router.push("/intro"); // 로그인 성공 시 Intro로 이동
        } else {
          alert("로그인 실패: " + result.message);
        }
      } catch (error) {
        alert("로그인 처리 중 오류가 발생했습니다.");
      }
    },
    goToSignup() {
      this.$router.push('/signup'); // 로그인 페이지로 이동
    },
  },
};
</script>

<style scoped>
/* 페이지 배경색 설정 */
.button-signup {
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


.login-page {
  background-color: #e8e8e8;
  min-height: calc(100vh - 5vh); /* 버튼 높이만큼 제외 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* 로그인 컨테이너 스타일 */
.login-container {
  max-width: 400px; /* 컨테이너 최대 너비 */
  background: transparent; /* 컨테이너 배경 투명 */
  padding: 20px; /* 내부 여백 */
  border-radius: 0px; /* 직각 모서리 */
  box-shadow: none; /* 그림자 제거 */
  margin-top: -170px; /* 컨테이너를 위로 이동 */
}

/* 제목 스타일 */
h1 {
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  margin-bottom: 30px; /* 제목 아래 여백 */
  color: #333; /* 제목 색상 */
  font-size: 1.7rem; /* 글자 크기 */
  font-weight: normal; /* 기본 글자 두께 */
}

/* 입력 그룹 스타일 */
.form-group {
  position: relative; /* 오류 메시지를 그룹 내에서 고정 */
  margin-bottom: 15px; /* 입력 그룹 아래 여백 추가 */
  min-height: 6rem; /* 레이아웃 고정을 위한 최소 높이 (길이 늘림) */
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
  padding: 12px; /* 내부 여백 (길이 늘림) */
  border: 1px solid #e8e8e8; /* 테두리 색상 */
  border-radius: 0px; /* 모서리를 직각으로 설정 */
  font-size: 0.8em; /* 글자 크기 (크기 늘림) */
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

/* 버튼 스타일 */
.login-btn {
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

.login-btn:disabled {
  background: #ccc; /* 비활성화된 버튼 배경색 */
  cursor: not-allowed; /* 클릭 불가 커서 */
}

.login-btn:hover:not(:disabled) {
  background: #525252; /* 활성화된 버튼에 마우스를 올릴 때 배경색 */
}
</style>