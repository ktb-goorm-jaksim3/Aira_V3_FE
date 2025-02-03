// api.js
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

/**
 * 로그인 API 호출 함수
 */
export const handleLogin = async (email, password) => {
  try {
    console.log("Sending login request with:", { email, password });

    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: email,
      password: password,
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Login response:", response.data);

    return {
      success: true,
      data: response.data, // access_token 포함
    };
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error);
    return {
      success: false,
      message: error.response && error.response.data
        ? error.response.data
        : "서버 오류",
    }; 
  }
};

/**
 * 회원가입 API 호출 함수
 * param {string} nickname 사용자 닉네임
 * param {string} email 사용자 이메일
 * param {string} password 사용자 비밀번호
 * returns {object} 성공 여부와 데이터 또는 에러 메시지
 **/
export const handleSignup = async (nickname, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      username: nickname, // 닉네임을 username으로 전달
      email: email,
      password: password,
    });

    // 성공 시 데이터 반환
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // 실패 시 에러 메시지 반환
    return {
      success: false,
      message: error.response && error.response.data
        ? error.response.data
        : "서버 오류",
    };
  }
};

/**
 * 질문 답변 제출 API 호출 함수
 * param {object} answers 질문 답변 데이터
 * returns {object} 성공 여부와 메시지
 */
export const submitQuestionAnswers = async (answers) => {
  const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
  try {
    const response = await axios.post(`${API_BASE_URL}/questions/submit`, answers, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // 인증 헤더에 토큰 추가
      },
    });
    
    // 응답에서 success 값을 명시적으로 설정
    return {
      success: true, // 성공적으로 요청이 처리된 경우
      data: response.data, // 응답 데이터
    };
  } catch (error) {
    console.error("Error submitting answers:", error);
    return {
      success: false, // 요청이 실패한 경우
      message: error.response?.data?.message || "서버 오류", // 오류 메시지
    };
  }
};

// 사용자 정보 가져오기
export const getUserInfo = async () => {
  const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}` // 인증 헤더에 토큰 추가
      }
    });
    return response.data; // 사용자 정보 반환
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null; // 오류 발생 시 null 반환
  }
};


/**
 * 챗봇 메시지 전송 API 호출 함수
 */
// src/api/api.js
export const sendMessageToBot = async (message) => {
  const API_BASE_URL = import.meta.env.VUE_APP_API_BASE_URL; // 환경 변수에서 API 주소 가져오기

  try {
    const response = await fetch(`${API_BASE_URL}/generate/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: message, // 사용자 입력 메시지
        max_tokens: 200, // 응답 길이 제한
        temperature: 0.7, // 창의성 조절 (값이 높을수록 랜덤성이 증가)
      }),
    });

    if (!response.ok) {
      throw new Error("서버 응답 실패");
    }

    return await response.json(); // JSON 응답 반환
  } catch (error) {
    console.error("API 호출 오류:", error);
    return { success: false, response: "백엔드 통신 오류 발생" };
  }
};