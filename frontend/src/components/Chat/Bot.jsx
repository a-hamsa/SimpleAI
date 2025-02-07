import React, { useState, useRef, useEffect } from 'react';
import api from '../../api';

const Bot = ({ onNewMessage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    const chatContainer = messagesEndRef.current?.parentElement;
    if (chatContainer) {
      chatContainer.scrollTop = 0;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatBotResponse = (text) => {
    const lines = text.split(/(?:\r?\n|\s{2,})/);
    return lines
      .filter(line => line.trim())
      .map(line => {
        if (line.match(/^https?:\/\//i)) {
          return `<a href="${line}" target="_blank" class="text-blue-500 hover:underline">${line}</a>`;
        }
        if (line.match(/^\d+[\.\)]/)) {
          return `<strong>${line}</strong>`;
        }
        return line;
      })
      .join('<br />');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await api.post('OpenAI/complete', {
        prompt: userMessage
      });
      
      const formattedResponse = formatBotResponse(response.data.completion);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: formattedResponse,
        isHtml: true 
      }]);
      if (onNewMessage) {
        onNewMessage();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { type: 'error', content: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div 
        className="flex-1 overflow-y-auto flex flex-col-reverse p-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="text-center mb-4">
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
        {messages.slice().reverse().map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black'
              } whitespace-pre-wrap`}
            >
              {message.isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Bot;
