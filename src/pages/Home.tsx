import React, { useState, useEffect, useRef } from 'react';
import { aiJudyService, AIJudyResponse } from '../services/aiJudyService';

const GREETING = "Hi! This is AI Judy, what questions can I answer for you?";
const FOLLOW_UP = "Would you like to ask another question? Just start typing!";
const ERROR_MESSAGE = "Sorry, I'm having trouble connecting right now. Please try again!";

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  sources?: string[];
}

const Home: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [currentQA, setCurrentQA] = useState<ChatMessage[]>([]);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Typing animation for AI Judy messages
  const typeAIMessage = (fullText: string, callback?: () => void) => {
    setIsTyping(true);
    setTypingText('');
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        setTypingText('');
        if (callback) callback();
      }
    }, 28);
  };

  // On mount, show greeting with typing effect
  useEffect(() => {
    setCurrentQA([]);
    setShowGreeting(true);
    typeAIMessage(GREETING, () => {
      setCurrentQA([{ sender: 'ai', text: GREETING }]);
      setShowGreeting(false);
    });
    // eslint-disable-next-line
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentQA, typingText]);

  // When user starts typing a new question, fade out previous Q&A, then show only greeting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
    if (
      (currentQA.length > 1 || (currentQA[0] && currentQA[0].text !== GREETING)) &&
      !fadeOut &&
      e.target.value.length === 1 // only trigger on first character
    ) {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentQA([{ sender: 'ai', text: GREETING }]);
        setShowGreeting(true);
        typeAIMessage(GREETING, () => {
          setCurrentQA([{ sender: 'ai', text: GREETING }]);
          setShowGreeting(false);
          setFadeOut(false);
        });
      }, 350); // match fade-out duration
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isTyping && !isLoading) {
      const userMsg: ChatMessage = { sender: 'user', text: question };
      setCurrentQA(prev => [...prev, userMsg]);
      const currentQuestion = question;
      setQuestion('');
      setIsLoading(true);
      
      try {
        // Call AI Judy API
        const response: AIJudyResponse = await aiJudyService.askQuestion(currentQuestion);
        
        // Create AI message with metadata
        const aiMsg: ChatMessage = {
          sender: 'ai',
          text: response.response,
          sources: response.relevantSources
        };
        
        // Add AI response with typing effect
        typeAIMessage(response.response, () => {
          setCurrentQA(prev => [...prev, aiMsg]);
          
          // Add follow-up question after a delay
          setTimeout(() => {
            typeAIMessage(FOLLOW_UP, () => {
              setCurrentQA(prev => [...prev, { sender: 'ai', text: FOLLOW_UP }]);
            });
          }, 1000);
        });
        
      } catch (error) {
        console.error('Error getting AI Judy response:', error);
        
        // Add error message with typing effect
        typeAIMessage(ERROR_MESSAGE, () => {
          const errorMsg: ChatMessage = { sender: 'ai', text: ERROR_MESSAGE };
          setCurrentQA(prev => [...prev, errorMsg]);
          
          // Still add follow-up question
          setTimeout(() => {
            typeAIMessage(FOLLOW_UP, () => {
              setCurrentQA(prev => [...prev, { sender: 'ai', text: FOLLOW_UP }]);
            });
          }, 1000);
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="home-container-flex">
      <div className="home-main-content">
        <div className="intro-section">
          <h1>Hi! 👋 My name is Judy</h1>
          <p className="intro-text">
              It's nice to meet you :) 
              <br />
              <br />
              I'm a software engineer based in San Francisco.
              <br />
              <br />
              Ask me anything! 🤖
          </p>
        </div>
      </div>
      <div className="chatbot-section chatbot-right chatbot-large chatbot-no-bg">
        <div className="chatbot-container">
          <div className={`chatbot-history chatbot-no-bg${fadeOut ? ' chatbot-fade-out' : ''}`}>
            {/* Show greeting with typing effect if showGreeting or if typing the greeting */}
            {showGreeting && (
              <div className="chatbot-ai-msg">
                <strong>AI Judy:</strong> {typingText}
                <span className="chatbot-cursor">|</span>
              </div>
            )}
            {/* Show Q&A if not showing greeting typing effect */}
            {!showGreeting && currentQA.map((msg, idx) => (
              <div key={idx} className={msg.sender === 'user' ? 'chatbot-user-msg' : 'chatbot-ai-msg'}>
                <strong>{msg.sender === 'user' ? 'You' : 'AI Judy'}:</strong> {msg.text}
                {/* Show sources for AI messages */}
                {msg.sender === 'ai' && msg.sources && msg.sources.length > 0 && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#666' }}>
                    Pulled from: {msg.sources.map(source => source.replace('.md', '').replace(/-/g, ' ')).join(', ')}
                  </div>
                )}
              </div>
            ))}
            {/* Show typing animation for AI responses */}
            {!showGreeting && isTyping && (
              <div className="chatbot-ai-msg">
                <strong>AI Judy:</strong> {typingText}
                <span className="chatbot-cursor">|</span>
              </div>
            )}
            {/* Show loading indicator */}
            {!showGreeting && isLoading && !isTyping && (
              <div className="chatbot-ai-msg">
                <strong>AI Judy:</strong> Thinking...
                <span className="chatbot-cursor">|</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-input-container">
            <form className="chatbot-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="chatbot-input"
                placeholder="Type your question here..."
                value={question}
                onChange={handleInputChange}
                maxLength={200}
                autoFocus
                disabled={isTyping || isLoading}
              />
              <button 
                type="submit" 
                className="chatbot-submit" 
                disabled={!question.trim() || isTyping || isLoading}
              >
                {isLoading ? 'Thinking...' : 'Ask'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 