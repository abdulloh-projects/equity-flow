import { api } from './api';

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: { userId?: string; user_id?: string; role?: string; [key: string]: unknown };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
}

export const authService = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { email, password }),

  register: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
  }) => api.post<RegisterResponse>('/auth/register', data),

  sendOtp: (email: string) =>
    api.post<OtpResponse>('/auth/send-otp', { email }),

  verifyOtp: (email: string, otp: string) =>
    api.post<OtpResponse>('/auth/verify-otp', { email, otp }),
};
