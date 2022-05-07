import { createStore } from "vuex";
import { websocketPlugin } from "@/socket/socket";

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  plugins: [websocketPlugin],
});

export default store;
