"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const api_1 = require("./api");
exports.authService = {
    login: (email, password) => api_1.api.post('/auth/login', { email, password }),
    register: (data) => api_1.api.post('/auth/register', data),
    sendOtp: (email) => api_1.api.post('/auth/send-otp', { email }),
    verifyOtp: (email, otp) => api_1.api.post('/auth/verify-otp', { email, otp }),
};
