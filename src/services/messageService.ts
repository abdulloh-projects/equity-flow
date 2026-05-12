import { api } from './api';

export interface SendMessageRequest {
  receiver_id: string;
  text: string;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
}

export interface ConversationsResponse {
  success: boolean;
  conversations: Array<{
    id: string;
    participants: string[];
    last_message?: string;
    last_sender?: string;
    messages_count: number;
    created_at: string;
    updated_at?: string;
  }>;
}

export interface MessagesResponse {
  success: boolean;
  messages: Array<{
    id: string;
    conversation_id: string;
    sender_id: string;
    text: string;
    created_at: string;
  }>;
}

export const messageService = {
  send: (data: SendMessageRequest) =>
    api.post<SendMessageResponse>('/messages/send', data, true),

  getConversations: () =>
    api.get<ConversationsResponse>('/messages/conversations'),

  getMessages: (conversationId: string) =>
    api.get<MessagesResponse>(`/messages/${conversationId}`),
};
