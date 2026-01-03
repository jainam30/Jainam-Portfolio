import { useState, useEffect, useRef } from 'react'
import useScrollSection from '@/utils/useScrollSection'

export default function RobotGuide() {
  const activeSection = useScrollSection()
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasWelcomed, setHasWelcomed] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const chatInputRef = useRef(null)

  // Show welcome message after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasWelcomed(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && chatInputRef.current) {
      chatInputRef.current.focus()
    }
  }, [isChatOpen])

  const tooltipMessages = {
    hero: "👋 Welcome! I'm your guide. Let me show you around Jainam's portfolio!",
    about: "Here you'll learn about Jainam's background and passion for AI-driven development.",
    skills: "Check out the technical skills and expertise Jainam brings to the table!",
    experience: "Explore Jainam's professional journey and educational background.",
    projects: "These are some amazing projects Jainam has built. Click to learn more!",
    contact: "Ready to connect? Drop a message and let's start a conversation!"
  }

  const currentTooltip = tooltipMessages[activeSection] || tooltipMessages.hero

  // AI Response System
  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim()

    // Greetings
    if (msg.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)$/)) {
      return {
        text: "Hello! 👋 I'm Jainam's AI assistant. I can help you explore the portfolio, learn about skills and projects, or guide you to the contact form. What would you like to know?",
        action: null
      }
    }

    // Help
    if (msg.includes('help') || msg.includes('what can you do') || msg.includes('how can you help')) {
      return {
        text: "I can help you with:\n\n🎯 Navigate to different sections (Skills, Projects, Experience, About)\n📧 Guide you to the contact form\n💼 Answer questions about Jainam's work\n🚀 Explore featured projects\n\nJust ask me anything!",
        action: null
      }
    }

    // Skills
    if (msg.includes('skill') || msg.includes('technolog') || msg.includes('what can') || msg.includes('tech stack')) {
      return {
        text: "Jainam has expertise in AI/ML, Full-Stack Development, and Cloud Technologies! Let me take you to the skills section to see the full tech stack. 🚀",
        action: 'skills'
      }
    }

    // Projects
    if (msg.includes('project') || msg.includes('portfolio') || msg.includes('work') || msg.includes('built') || msg.includes('created')) {
      return {
        text: "Jainam has built some amazing projects! From AI-powered applications to full-stack web solutions. Let me show you the projects section. 💻",
        action: 'projects'
      }
    }

    // Experience
    if (msg.includes('experience') || msg.includes('education') || msg.includes('background') || msg.includes('qualification') || msg.includes('study')) {
      return {
        text: "Want to know about Jainam's professional journey and education? Let me navigate you to the experience section! 📚",
        action: 'experience'
      }
    }

    // About
    if (msg.includes('about') || msg.includes('who are you') || msg.includes('who is jainam') || msg.includes('tell me more')) {
      return {
        text: "Let me tell you about Jainam! Navigating to the about section where you can learn about the background and passion for development. 🌟",
        action: 'about'
      }
    }

    // Contact
    if (msg.includes('contact') || msg.includes('email') || msg.includes('hire') || msg.includes('reach') || msg.includes('connect') || msg.includes('get in touch') || msg.includes('message')) {
      return {
        text: "Ready to connect with Jainam? I'll take you to the contact section where you can fill out the form or find direct contact information! 📧",
        action: 'contact'
      }
    }

    // Resume/CV
    if (msg.includes('resume') || msg.includes('cv') || msg.includes('download')) {
      return {
        text: "You can find Jainam's resume in the hero section at the top of the page. Let me scroll you there! 📄",
        action: 'hero'
      }
    }

    // Thanks
    if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
      return {
        text: "You're welcome! Feel free to ask me anything else about Jainam's portfolio. I'm here to help! 😊",
        action: null
      }
    }

    // Default fallback
    return {
      text: "That's a great question! I can help you navigate to different sections of the portfolio or answer questions about Jainam's skills, projects, and experience. Try asking me about:\n\n• Skills & Technologies\n• Projects & Portfolio\n• Experience & Education\n• Contact Information\n\nWhat would you like to explore?",
      action: null
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setInputValue('')

    // Show typing indicator
    setIsTyping(true)

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Get AI response
    const response = getAIResponse(userMessage)

    setIsTyping(false)

    // Add bot message
    setMessages(prev => [...prev, { type: 'bot', text: response.text }])

    // Perform action if any
    if (response.action) {
      setTimeout(() => {
        scrollToSection(response.action)
      }, 500)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleRobotClick = () => {
    if (!isChatOpen) {
      setIsChatOpen(true)
      // Add welcome message if first time opening
      if (messages.length === 0) {
        setMessages([{
          type: 'bot',
          text: "👋 Hi! I'm Jainam's AI assistant. I'm here to help you explore the portfolio!\n\nYou can ask me about:\n• Skills & Technologies\n• Projects & Work\n• Experience & Education\n• Contact Information\n\nWhat would you like to know?"
        }])
      }
    } else {
      setIsChatOpen(false)
    }
  }

  if (!hasWelcomed) return null

  return (
    <div className="robot-guide-container" style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '12px'
    }}>
      {/* Chat Modal */}
      {isChatOpen && (
        <div className="chat-modal" style={{
          width: '380px',
          maxWidth: 'calc(100vw - 40px)',
          height: '500px',
          maxHeight: 'calc(100vh - 140px)',
          background: 'rgba(20, 20, 30, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {/* Chat Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(139, 92, 246, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px' }}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="15" width="60" height="50" rx="12" fill="#E8E8F0" stroke="#8B5CF6" strokeWidth="2" />
                  <line x1="50" y1="15" x2="50" y2="5" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="50" cy="5" r="3" fill="#C084FC">
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="35" cy="35" r="8" fill="#1E1E2E" stroke="#8B5CF6" strokeWidth="2" />
                  <circle cx="65" cy="35" r="8" fill="#1E1E2E" stroke="#8B5CF6" strokeWidth="2" />
                  <circle cx="37" cy="33" r="3" fill="#8B5CF6" opacity="0.8" />
                  <circle cx="67" cy="33" r="3" fill="#8B5CF6" opacity="0.8" />
                  <path d="M 35 50 Q 50 55 65 50" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
                  <rect x="25" y="65" width="50" height="25" rx="8" fill="#E8E8F0" stroke="#8B5CF6" strokeWidth="2" />
                  <circle cx="40" cy="77" r="3" fill="#8B5CF6" opacity="0.6" />
                  <circle cx="50" cy="77" r="3" fill="#8B5CF6" opacity="0.6" />
                  <circle cx="60" cy="77" r="3" fill="#8B5CF6" opacity="0.6" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#F5F5F7' }}>AI Assistant</div>
                <div style={{ fontSize: '12px', color: '#A78BFA' }}>Online</div>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#A78BFA',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '4px 8px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#F5F5F7'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#A78BFA'}
            >
              ×
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'fadeIn 0.3s ease-in'
                }}
              >
                <div style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: msg.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.type === 'user'
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%)'
                    : 'rgba(139, 92, 246, 0.15)',
                  border: msg.type === 'user' ? 'none' : '1px solid rgba(139, 92, 246, 0.3)',
                  color: '#F5F5F7',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-line',
                  wordBreak: 'break-word'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                animation: 'fadeIn 0.3s ease-in'
              }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center'
                }}>
                  <div className="typing-dot" style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#A78BFA',
                    animation: 'typingDot 1.4s infinite'
                  }} />
                  <div className="typing-dot" style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#A78BFA',
                    animation: 'typingDot 1.4s infinite 0.2s'
                  }} />
                  <div className="typing-dot" style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#A78BFA',
                    animation: 'typingDot 1.4s infinite 0.4s'
                  }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid rgba(139, 92, 246, 0.3)',
            background: 'rgba(139, 92, 246, 0.05)'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-end'
            }}>
              <input
                ref={chatInputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(10, 10, 15, 0.6)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: '#F5F5F7',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)'}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: inputValue.trim() ? 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%)' : 'rgba(139, 92, 246, 0.3)',
                  border: 'none',
                  color: '#F5F5F7',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: inputValue.trim() ? '0 4px 15px rgba(139, 92, 246, 0.4)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim()) {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tooltip (only show when chat is closed) */}
      {!isMinimized && !isChatOpen && (
        <div className="speech-bubble" style={{
          background: 'rgba(139, 92, 246, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '16px',
          padding: '12px 16px',
          maxWidth: '280px',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
          animation: 'fadeIn 0.5s ease-in-out',
          position: 'relative'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#F5F5F7'
          }}>
            {currentTooltip}
          </p>
          {/* Speech bubble arrow */}
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            right: '30px',
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid rgba(139, 92, 246, 0.4)'
          }} />
        </div>
      )}

      {/* Robot Character */}
      <div
        className="robot-character"
        onClick={handleRobotClick}
        style={{
          width: '80px',
          height: '80px',
          cursor: 'pointer',
          animation: 'float 3s ease-in-out infinite',
          transition: 'transform 0.3s ease',
          filter: 'drop-shadow(0 4px 20px rgba(139, 92, 246, 0.4))',
          position: 'relative'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Robot Head */}
          <rect x="20" y="15" width="60" height="50" rx="12" fill="#E8E8F0" stroke="#8B5CF6" strokeWidth="2" />

          {/* Antenna */}
          <line x1="50" y1="15" x2="50" y2="5" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="5" r="3" fill="#C084FC">
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Eyes */}
          <circle cx="35" cy="35" r="8" fill="#1E1E2E" stroke="#8B5CF6" strokeWidth="2">
            <animate attributeName="r" values="8;9;8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="65" cy="35" r="8" fill="#1E1E2E" stroke="#8B5CF6" strokeWidth="2">
            <animate attributeName="r" values="8;9;8" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* Eye highlights */}
          <circle cx="37" cy="33" r="3" fill="#8B5CF6" opacity="0.8">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="67" cy="33" r="3" fill="#8B5CF6" opacity="0.8">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Smile */}
          <path d="M 35 50 Q 50 55 65 50" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />

          {/* Body */}
          <rect x="25" y="65" width="50" height="25" rx="8" fill="#E8E8F0" stroke="#8B5CF6" strokeWidth="2" />

          {/* Body details */}
          <circle cx="40" cy="77" r="3" fill="#8B5CF6" opacity="0.6" />
          <circle cx="50" cy="77" r="3" fill="#8B5CF6" opacity="0.6" />
          <circle cx="60" cy="77" r="3" fill="#8B5CF6" opacity="0.6" />

          {/* Arms */}
          <rect x="10" y="70" width="15" height="8" rx="4" fill="#E8E8F0" stroke="#8B5CF6" strokeWidth="2" />
          <rect x="75" y="70" width="15" height="8" rx="4" fill="#E8E8F0" stroke="#8B5CF6" strokeWidth="2" />

          {/* Hands */}
          <circle cx="10" cy="74" r="4" fill="#C084FC" />
          <circle cx="90" cy="74" r="4" fill="#C084FC" />
        </svg>

        {/* Chat notification badge */}
        {!isChatOpen && (
          <div style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%)',
            border: '2px solid #1E1E2E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#FFF',
            animation: 'pulse 2s infinite'
          }}>
            💬
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes typingDot {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-8px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 6px rgba(139, 92, 246, 0);
          }
        }

        .speech-bubble {
          animation: fadeIn 0.5s ease-in-out;
        }

        @media (max-width: 768px) {
          .robot-guide-container {
            bottom: 20px !important;
            right: 20px !important;
          }
          
          .robot-character {
            width: 60px !important;
            height: 60px !important;
          }
          
          .speech-bubble {
            max-width: 200px !important;
            font-size: 12px !important;
            padding: 10px 12px !important;
          }

          .chat-modal {
            width: calc(100vw - 40px) !important;
            height: calc(100vh - 120px) !important;
            max-height: calc(100vh - 120px) !important;
          }
        }
      `}</style>
    </div>
  )
}
