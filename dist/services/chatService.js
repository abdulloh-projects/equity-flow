"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const api_1 = require("./api");
exports.chatService = {
    sendMessage: (message, session_id) => api_1.api.post('/chat/', { message, session_id }, false),
    clearSession: (session_id) => api_1.api.del(`/chat/session/${session_id}`),
    health: () => api_1.api.get('/chat/health', false),
};
