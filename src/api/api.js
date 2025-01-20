// api.js
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

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
 * 로그인 API 호출 함수
 */
export const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: email,
        password: password,
      });
  
      return {
        success: true,
        data: response.data, // access_token 포함
      };
    } catch (error) {
      return {
        success: false,
        message: error.response && error.response.data
          ? error.response.data
          : "서버 오류",
      };
    }
  };