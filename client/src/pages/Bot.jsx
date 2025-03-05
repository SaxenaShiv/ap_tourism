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
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-5 text-center">
          <h1 className="text-2xl font-bold">Andhra Pradesh Travel Planner</h1>
          <p className="text-base text-white/80">Your AI Travel Companion</p>
        </div>

        {/* Chat Messages Container */}
        <div 
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto p-6 space-y-5"
          style={{ maxHeight: 'calc(100vh - 350px)', minHeight: '400px' }}
        >
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="text-center text-gray-500 italic text-lg">
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
                  max-w-[85%] p-4 rounded-xl 
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
                      h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-blue-700 mt-3 mb-2" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-blue-600 mt-2 mb-2" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside pl-3 space-y-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside pl-3 space-y-2" {...props} />,
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
              <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                <Compass className="mr-3 animate-spin text-blue-500 w-6 h-6" />
                <span className="text-gray-600 text-base">Generating your trip plan...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white p-5 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="relative">
            <textarea 
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your dream trip to Andhra Pradesh... (e.g., 'I want to explore historical sites and beaches')"
              className="w-full p-4 pr-14 border rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none max-h-[200px] transition-all duration-300 text-base"
              rows={1}
            />
            <button 
              type="submit" 
              disabled={isLoading || !prompt.trim()}
              className="absolute bottom-3 right-3 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:opacity-50 transition-all"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;