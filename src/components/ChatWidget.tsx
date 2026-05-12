import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { chatService } from '../services/chatService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content:
        "Hello! I'm the EquityFlow AI Assistant. I can help you understand the platform, investment processes, and startup details. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    chatService.health().catch(() => {
      // silently ignore – connectivity will show on first message attempt
    });
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await chatService.sendMessage(text, sessionId);
      if (!sessionId) setSessionId(res.sessionId);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.response,
        sources: res.sources,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "Sorry, I'm having trouble connecting right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {isOpen && (
        <div className="w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-[#DCE3E8] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#274060] px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  EquityFlow Assistant
                </p>
                <p className="text-white text-xs opacity-70">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F7FA]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#274060] text-white rounded-tr-sm'
                      : 'bg-white text-[#0F1720] rounded-tl-sm shadow-sm border border-[#DCE3E8]'
                  }`}
                >
                  <p className="leading-relaxed">{msg.content}</p>
                  {msg.sources && msg.sources.length > 0 && (
                    <p className="text-xs mt-1.5 opacity-60">
                      Sources: {msg.sources.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#DCE3E8]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#274060]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-[#DCE3E8] flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 text-sm border border-[#DCE3E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#274060] focus:border-[#274060]"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 bg-[#274060] rounded-lg flex items-center justify-center hover:bg-[#3A5A7A] transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#274060] rounded-full shadow-lg flex items-center justify-center hover:bg-[#3A5A7A] transition-all duration-200 hover:scale-105"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
