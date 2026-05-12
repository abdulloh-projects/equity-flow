"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageService = void 0;
const api_1 = require("./api");
exports.messageService = {
    send: (data) => api_1.api.post('/messages/send', data, true),
    getConversations: () => api_1.api.get('/messages/conversations'),
    getMessages: (conversationId) => api_1.api.get(`/messages/${conversationId}`),
};
