import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Compass } from 'lucide-react';
import { tripPlannerService } from '../../apiService';

const AIChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [prompt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: prompt };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Reset input
    setPrompt('');
    setIsLoading(true);

    try {
      // Send to AI and get response
      const result = await tripPlannerService.getPlanTrip(prompt);
      
      // Add AI response
      const aiMessage = { 
        type: 'ai', 
        content: result.response 
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (err) {
      // Add error message
      const errorMessage = { 
        type: 'error', 
        content: err.message || 'An unknown error occurred' 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key for submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-4 text-center">
          <h1 className="text-xl font-bold">Andhra Pradesh Travel Planner</h1>
          <p className="text-sm text-white/80">Your AI Travel Companion</p>
        </div>

        {/* Chat Messages Container */}
        <div 
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto p-4 space-y-4"
          style={{ maxHeight: 'calc(100vh - 300px)' }}
        >
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="text-center text-gray-500 italic">
              Start your travel planning journey!
            </div>
          )}

          {/* Message Rendering */}
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${
                message.type === 'user' 
                  ? 'justify-end' 
                  : 'justify-start'
              }`}
            >
              <div 
                className={`
                  max-w-[80%] p-3 rounded-lg 
                  ${message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : message.type === 'error'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                  }
                `}
              >
                {message.type === 'ai' ? (
                  <ReactMarkdown 
                    components={{
                      h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-blue-700 mt-2 mb-1" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-base font-semibold text-blue-600 mt-1 mb-1" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside pl-2 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside pl-2 space-y-1" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center">
                <Compass className="mr-2 animate-spin text-blue-500" />
                <span className="text-gray-600">Generating your trip plan...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="relative">
            <textarea 
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your dream trip to Andhra Pradesh... (e.g., 'I want to explore historical sites and beaches')"
              className="w-full p-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none max-h-[150px] transition-all duration-300"
              rows={1}
            />
            <button 
              type="submit" 
              disabled={isLoading || !prompt.trim()}
              className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;