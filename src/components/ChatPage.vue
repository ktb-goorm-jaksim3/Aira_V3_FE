<template>
  <div class="chat-container">
    <h1>Aira ChatBot</h1>

    <!-- 메인 이미지 -->
    <main>
      <div class="center-image">
        <img src="https://tkddk0108.github.io/image-for-Aira/Aira.png" alt="Mars Central Image">
      </div>
    </main>

    <!-- 채팅 인터페이스 -->
    <section id="chat-window">
      <div id="chat-output">
        <p v-for="(message, index) in messages" :key="index" :class="message.sender">
          {{ message.text }}
        </p>
      </div>
      <div id="chat-input-container">
        <input v-model="userInput" type="text" placeholder="Type your message..." @keyup.enter="sendMessage" />
        <button @click="sendMessage" :disabled="isDisabled">↑</button>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import { sendMessageToBot } from "../api/api.js"; // API 호출 함수 불러오기

export default {
  setup() {
    const userInput = ref(""); // 사용자 입력을 저장하는 반응형 상태
    const messages = ref([]); // 채팅 메시지 목록을 저장하는 반응형 배열
    const isDisabled = ref(false); // API 요청 중 버튼 비활성화를 위한 상태

    /**
     * 사용자 메시지를 서버로 전송하고, AI 응답을 받아오는 함수
     */
    const sendMessage = async () => {
      if (userInput.value.trim() === "") return; // 빈 입력값일 경우 실행하지 않음

      isDisabled.value = true; // 버튼을 비활성화하여 중복 요청 방지

      // 사용자 메시지를 채팅창에 추가
      messages.value.push({ text: `You: ${userInput.value}`, sender: "user" });

      try {
        // API 호출 및 응답 처리
        const response = await sendMessageToBot(userInput.value);
        if (response.success) {
          // 성공적으로 응답을 받으면 GPT 메시지를 채팅창에 추가
          messages.value.push({ text: `Aira: ${response.response}`, sender: "gpt" });
        } else {
          // API 호출 실패 시 오류 메시지를 표시
          messages.value.push({ text: "Error: 백엔드 통신 실패", sender: "gpt" });
        }
      } catch (error) {
        // API 호출 중 에러가 발생하면 오류 메시지를 채팅창에 추가
        messages.value.push({ text: "Error: 백엔드 통신 실패", sender: "gpt" });
      }

      isDisabled.value = false; // 버튼을 다시 활성화
      userInput.value = ""; // 입력 필드를 초기화
    };

    return { userInput, messages, sendMessage, isDisabled };
  },
};
</script>

<style scoped>
/* 기본 리셋 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 전체 컨테이너 스타일 */
.chat-container {
  font-family: 'Pretendard', Arial, sans-serif;
  background: linear-gradient(180deg, #CCCCCC 0%, #B7B7B7 100%);
  text-align: center;
  padding: 50px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

/* 메인 이미지 스타일 */
.center-image img {
  width: 200px;
  height: auto;
  object-fit: cover;
  margin-bottom: -30px;
}

/* 채팅창 컨테이너 */
#chat-window {
  position: relative;
  width: 90%;
  height: 70vh;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}

/* 채팅 출력 영역 */
#chat-output {
  width: 100%;
  height: 30vh;
  overflow-y: auto;
  padding: 10px;
  font-size: 16px;
  color: white;
  line-height: 1.5;
  border-radius: 5px;
  margin-bottom: 15px;
}

/* 입력창과 버튼 컨테이너 */
#chat-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 5%;
}

/* 입력창 스타일 */
#user-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

/* 버튼 스타일 */
button {
  background: white;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  padding: 10px 15px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
