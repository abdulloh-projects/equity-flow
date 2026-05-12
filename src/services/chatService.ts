import { api } from './api';

export interface ChatResponse {
  response: string;
  sessionId: string;
  sources: string[];
}

export const chatService = {
  sendMessage: (message: string, session_id?: string) =>
    api.post<ChatResponse>('/chat/', { message, session_id }, false),

  streamMessage: async (
    message: string,
    session_id: string | undefined,
    onToken: (token: string) => void,
    onDone: (session_id: string, sources: string[]) => void,
    onError: (err: string) => void,
  ): Promise<void> => {
    const token = localStorage.getItem('equity_flow_token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, session_id }),
    });

    if (!res.ok || !res.body) {
      onError(`HTTP ${res.status}`);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        try {
          const evt = JSON.parse(line.slice(6));
          if (evt.type === 'token') onToken(evt.text);
          else if (evt.type === 'done') onDone(evt.session_id, evt.sources ?? []);
          else if (evt.type === 'error') onError(evt.text);
        } catch { /* skip malformed */ }
      }
    }
  },

  clearSession: (session_id: string) =>
    api.del(`/chat/session/${session_id}`),

  health: () =>
    api.get<{ status: string; detail: string }>('/chat/health', false),
};
