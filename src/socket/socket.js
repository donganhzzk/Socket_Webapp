import { io } from "socket.io-client";

const BACKEND_SERVER = "http://127.0.0.1:8000";
const socket = io(BACKEND_SERVER, { autoConnect: false });

function createWebSocketPlugin(socket) {
  return (store) => {
    store.$socket = socket;
    // Thêm các socket event listening
  };
}

// Plugin lưu giá trị nhận được từ Socket vào Vuex store
export const websocketPlugin = createWebSocketPlugin(socket);

export default socket;
