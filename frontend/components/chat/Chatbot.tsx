// frontend/components/chat/Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css'; // Import the custom CSS

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isSending: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ messages, onSendMessage, isSending }) => {
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isSending]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isSending) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="chatbot-main-container">
      <div className="chatbot-messages-display">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chatbot-message-row ${msg.sender}`}
          >
            <div className={`chatbot-message-bubble ${msg.sender}`}>
              <p className="chatbot-message-text">{msg.text}</p>
              <span className="chatbot-message-time">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isSending && (
          <div className="chatbot-message-row bot">
            <div className="chatbot-message-bubble bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="chatbot-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chatbot-input-field"
          disabled={isSending}
        />
        <button
          type="submit"
          className="chatbot-send-button"
          disabled={isSending}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
