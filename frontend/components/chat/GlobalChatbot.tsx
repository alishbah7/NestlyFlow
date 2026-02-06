"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Chatbot, { Message } from './Chatbot';
import ChatLogin from './ChatLogin';
import './GlobalChatbot.css';
import { MessageCircle, X } from 'lucide-react';
import Cookies from 'js-cookie';

export default function GlobalChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [history, setHistory] = useState<any[]>([]); // New state for conversation history
    const [isSending, setIsSending] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const { user, triggerTodosUpdate } = useAuth();

    useEffect(() => {
        if (isOpen) {
            // Reset chat when opened
            setMessages([
                {
                    id: 1,
                    text: "Hello! I'm Flowy, your NestlyFlow assistant. How can I help you today?",
                    sender: 'bot',
                    timestamp: new Date(),
                } as Message,
            ]);
            setHistory([]); // Clear history
            setShowLogin(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (user && showLogin) {
            setShowLogin(false);
            const loginSuccessMessage: Message = {
                id: messages.length + 1,
                text: "Great, you're logged in! How can I help you with your tasks?",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, loginSuccessMessage]);
        }
    }, [user, showLogin, messages.length]);

    const handleSendMessage = async (messageText: string) => {
        setIsSending(true);

        const userMessage: Message = {
            id: messages.length + 1,
            text: messageText,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);

        // Heuristic to check for commands requiring login
        const isAuthCommand = /add|create|make|new|update|delete|list|show|my/i.test(messageText) && /task|todo/i.test(messageText);
        if (isAuthCommand && !user) {
            setShowLogin(true);
            setIsSending(false);
            return;
        }
        setShowLogin(false);

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://nestlyflow-api.up.railway.app';
        const token = Cookies.get('token');
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/chat/chatbot`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ message: messageText, history: history }), // Send history
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Chatbot error');
            }

            const botMessage: Message = {
                id: messages.length + 2,
                text: data.response,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
            setHistory(data.history); // Update history from response

            // Trigger UI update if a CRUD action was likely performed
            const responseText = data.response.toLowerCase();
                        console.log("Chatbot: Bot response indicates CRUD action, triggering todo update...");
                        // Add a small delay to ensure UI can catch up or for visual perception
                        setTimeout(() => {
                            triggerTodosUpdate();
                            console.log("Chatbot: triggerTodosUpdate() called after delay.");
                        }, 300); // 300ms delay
        } catch (err: any) {
            const errorMessage: Message = {
                id: messages.length + 2,
                text: `Error: ${err.message}`,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <button className="chatbot-fab" onClick={() => setIsOpen(!isOpen)}>
                <MessageCircle className="chatbot-fab-icon" />
            </button>

            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <h2>ɴᴇꜱᴛʟʏғʟᴏᴡ</h2>
                    <button onClick={() => setIsOpen(false)} className="chatbot-close-btn">
                        <X size={24} />
                    </button>
                </div>
                <div className="chatbot-messages-container">
                    {showLogin ? (
                        <ChatLogin message="To perform this action, please sign in first!" />
                    ) : (
                        <Chatbot messages={messages} onSendMessage={handleSendMessage} isSending={isSending} />
                    )}
                </div>
            </div>
        </>
    );
}
