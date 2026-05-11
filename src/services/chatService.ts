import { api } from './api';

export interface ChatResponse {
  response: string;
  sessionId: string;
  sources: string[];
}

export const chatService = {
  sendMessage: (message: string, session_id?: string) =>
    api.post<ChatResponse>('/chat/', { message, session_id }, false),

  clearSession: (session_id: string) =>
    api.del(`/chat/session/${session_id}`),

  health: () =>
    api.get<{ status: string; detail: string }>('/chat/health', false),
};
