import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaComments, FaPaperPlane, FaRobot, FaUser, FaEllipsisV, FaDownload, FaTrashAlt, FaMoon, FaSun } from 'react-icons/fa';

const SYSTEM_PROMPT = `
You are an AI assistant for my personal profile website. Your job is to help visitors understand my work, skills, projects, and services available on this website.

Behavior Guidelines:
- When a user greets you (hello, hi, salam, etc.), respond warmly and include a few light emojis ONLY IN YOUR FIRST REPLY of the conversation. After the first reply, never start again with “hello”, “hi”, or similar greetings.
- Keep answers SHORT, clear, and directly related to this website only.
- Prefer bullet points and use these symbols:
  ✔️ for correct/available info
  ❌ for unavailable/not provided info
  📌 for important notes
- Assume you know all content on this website: profile, skills, projects, portfolio, services, and contact details. When helpful, mention where on the site something is (e.g. "📌 You can see this in the *Projects* section.").
- Track conversation context so your answers stay consistent with earlier messages.
- If a question is not about this website (politics, random facts, personal life, etc.), politely refuse and say you only answer questions about this website.
- Tone: professional, friendly, helpful, simple language, with light emoji use (do not spam emojis).
- Never answer unrelated questions, never invent details that are not on the website, and never write long explanations.

Always follow these rules before answering the user.
`;

const getWelcomeMessage = () => ({
  id: 1,
  text: "👋 Hello! I'm Shayan's AI assistant. How can I help you explore my skills, projects, or services today? 🙂",
  sender: 'bot',
  timestamp: new Date(),
});

const Chatbot = () => {
  const [panelDark, setPanelDark] = useState(() => {
    try {
      return localStorage.getItem('chatbot-panel-theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [getWelcomeMessage()]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  const API_BASE_URL = 'https://shayan-personal-assistant.vercel.app';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen) setMenuOpen(false);
  }, [isOpen]);

  const togglePanelTheme = useCallback(() => {
    setPanelDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('chatbot-panel-theme', next ? 'dark' : 'light');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Keep the message field focused whenever the panel is open and editable (re-focus after replies finish loading).
  useEffect(() => {
    if (!isOpen || isLoading || menuOpen) return;
    const id = window.requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [isOpen, isLoading, menuOpen]);

  // Prevent background page from scrolling when chat window is open
  useEffect(() => {
    if (isOpen) {
      const previousBodyOverflow = document.body.style.overflow;
      const previousHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousBodyOverflow || '';
        document.documentElement.style.overflow = previousHtmlOverflow || '';
      };
    }
  }, [isOpen]);

  const downloadTranscript = useCallback(() => {
    const exported = new Date().toLocaleString();
    const divider = `${'='.repeat(48)}\n`;
    const lines = messages.map((m) => {
      const t = new Date(m.timestamp).toLocaleString();
      const who = m.sender === 'bot' ? 'Assistant' : 'You';
      return `[${t}] ${who}:\n${m.text}`;
    });
    const body = [`Shayan's Assistant — Chat transcript`, `Exported: ${exported}`, '', divider, ...lines].join('\n\n');
    const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shayan-assistant-chat-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setMenuOpen(false);
  }, [messages]);

  const endChat = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsLoading(false);
    setInputMessage('');
    setMessages([getWelcomeMessage()]);
    setMenuOpen(false);
    setIsOpen(false);
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${SYSTEM_PROMPT}\n\nUser: ${userMessage.text}`,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (controller.signal.aborted) return;

      if (response.ok && data.reply) {
        const botMessage = {
          id: Date.now() + 1,
          text: data.reply,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/## (.*?)(?=\n|$)/g, '<h3 class="font-bold text-base mt-2 mb-1">$1</h3>')
      .replace(/# (.*?)(?=\n|$)/g, '<h2 class="font-bold text-lg mt-3 mb-2">$1</h2>')
      .replace(/\n/g, '<br />');
    return formatted;
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-float-button fixed bottom-20 sm:bottom-24 right-6 z-[9999] w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:animate-none hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'hidden' : 'flex'
        }`}
        aria-label="Open chat"
      >
        <FaComments className="text-xl" />
        {messages.length > 1 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
            {messages.length - 1}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] w-[380px] sm:w-[420px] h-[600px] rounded-2xl shadow-2xl flex flex-col border-2 overflow-hidden chatbot-window-animate ${
            panelDark ? 'bg-darkGray-card border-primary/30' : 'bg-white border-primary/20'
          }`}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <FaRobot className="text-xl" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-base truncate">Shayan&apos;s Assistant</h3>
                <p className="text-xs text-white/80">AI-powered help</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                aria-label="Chat options"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                <FaEllipsisV className="text-sm" />
              </button>
              <button
                type="button"
                onClick={togglePanelTheme}
                className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white text-lg"
                aria-label={panelDark ? 'Chat panel: switch to light' : 'Chat panel: switch to dark'}
                aria-pressed={panelDark}
                title={panelDark ? 'Light chat panel' : 'Dark chat panel'}
              >
                {panelDark ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0 relative">
            {/* Messages Container */}
            <div
              className={`flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide ${panelDark ? 'bg-darkGray' : 'bg-gray-50/50'}`}
            >
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <FaRobot className="text-primary text-sm" />
                    </div>
                  )}
                  <div
                    style={{
                      animationDelay: `${Math.min(index * 52, 260)}ms`,
                    }}
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                      message.sender === 'user'
                        ? 'chatbot-msg-card-user bg-primary text-white rounded-br-sm'
                        : `chatbot-msg-card-bot rounded-bl-sm shadow-sm ${
                            panelDark ? 'bg-darkGray-section text-[#e5e7eb]' : 'bg-white text-dark'
                          }`
                    }`}
                  >
                    {message.sender === 'bot' ? (
                      <div
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                      />
                    ) : (
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    )}
                    <span
                      className={`text-xs mt-1 block ${
                        message.sender === 'user'
                          ? 'text-white/70'
                          : panelDark
                            ? 'text-gray-400'
                            : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <FaUser className="text-primary text-sm" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-primary text-sm" />
                  </div>
                  <div
                    className={`chatbot-loading-bubble rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm ${
                      panelDark ? 'bg-darkGray-section' : 'bg-white'
                    }`}
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              className={`p-4 border-t shrink-0 ${panelDark ? 'border-gray-700 bg-darkGray-card' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  autoFocus
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading || menuOpen}
                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    panelDark
                      ? 'border-darkGray-border bg-darkGray text-[#e5e7eb]'
                      : 'border-gray-300 bg-white text-dark'
                  }`}
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading || menuOpen}
                  className="w-11 h-11 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </button>
              </div>
              <p className={`text-xs mt-2 text-center ${panelDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Press Enter to send
              </p>
            </div>

            {/* Options sheet (slides up from bottom) */}
            {menuOpen && (
              <>
                <button
                  type="button"
                  className={`chatbot-menu-backdrop absolute inset-0 z-[60] border-0 p-0 cursor-default ${
                    panelDark ? 'bg-black/55' : 'bg-black/35'
                  }`}
                  aria-label="Dismiss menu"
                  onClick={() => setMenuOpen(false)}
                />
                <div
                  role="menu"
                  aria-label="Chat actions"
                  className={`chatbot-menu-sheet absolute bottom-0 left-0 right-0 z-[70] mx-2 mb-2 rounded-xl shadow-xl border overflow-hidden ${
                    panelDark ? 'bg-darkGray-section border-darkGray-border' : 'bg-white border-gray-200'
                  }`}
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={downloadTranscript}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm transition-colors border-b ${
                      panelDark
                        ? 'text-[#e5e7eb] hover:bg-darkGray-card border-darkGray-border'
                        : 'text-dark hover:bg-gray-100 border-gray-100'
                    }`}
                  >
                    <FaDownload className="text-primary shrink-0" aria-hidden />
                    <span>Download transcript</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={endChat}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm transition-colors ${
                      panelDark
                        ? 'text-red-400 hover:bg-red-950/40'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <FaTrashAlt className="text-base shrink-0" aria-hidden />
                    <span>End chat</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
