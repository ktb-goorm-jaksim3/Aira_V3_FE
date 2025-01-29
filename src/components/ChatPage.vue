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
  
  export default {
    setup() {
      const BE_PUBLIC_IP = "http://aira-be-alb-1145499117.ap-northeast-2.elb.amazonaws.com";
      const userInput = ref("");
      const messages = ref([]);
      const isDisabled = ref(false);
  
      const sendMessage = async () => {
        if (userInput.value.trim() === "") return;
  
        isDisabled.value = true;
        messages.value.push({ text: `You: ${userInput.value}`, sender: "user" });
  
        try {
          const response = await fetch(`${BE_PUBLIC_IP}/generate/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: userInput.value,
              max_tokens: 200,
              temperature: 0.7,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch response from server.");
          }
  
          const data = await response.json();
          messages.value.push({ text: `Aira: ${data.response}`, sender: "gpt" });
        } catch (error) {
          messages.value.push({ text: "Error: 백엔드 통신 실패", sender: "gpt" });
        }
  
        isDisabled.value = false;
        userInput.value = "";
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden; /* 스크롤 막기 */
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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}

#chat-output {
  width: 100%; /* 채팅 출력 영역의 너비를 부모 요소에 맞춤 */
  height: 30vh; /* 채팅 출력 영역의 높이를 고정 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  padding: 10px; /* 내부 여백 */
  font-size: 16px; /* 텍스트 크기 */
  color: white; /* 텍스트 색상 */
  line-height: 1.5; /* 줄 간격 */
  background: none; /* 배경 제거 */
  border-radius: 5px; /* 모서리를 둥글게 처리 */
  box-sizing: border-box; /* 패딩과 테두리를 포함해 높이 계산 */
  margin-bottom: 15px; /* 🔹 입력창과의 간격 추가 */
}

/* 스크롤바 스타일 (선택 사항) */
#chat-output::-webkit-scrollbar {
  width: 8px; /* 스크롤바 너비 */
}

#chat-output::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5); /* 스크롤바 색상 */
  border-radius: 4px; /* 스크롤바 모서리를 둥글게 처리 */
}

#chat-output::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.2); /* 스크롤바 트랙 색상 */
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
  padding-top: 5%; /* 🔹 위쪽 여백 추가 */
}

/* 입력창 스타일 */
#user-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  color: black;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

/* 버튼 스타일 */
button {
  background: white;
  color: black;
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