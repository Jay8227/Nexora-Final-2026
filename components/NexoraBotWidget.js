import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Simulated IoT Data Store
const getIoTData = () => ({
  aqi: Math.floor(Math.random() * 100) + 30,
  trafficFlow: Math.floor(Math.random() * 40) + 60,
  waterPressure: Math.floor(Math.random() * 20) + 80,
  parkingAvailable: Math.floor(Math.random() * 200) + 50,
  powerLoad: Math.floor(Math.random() * 30) + 55,
});

// Simulated complaints database
const complaintsDB = {
  12345: {
    status: "In Progress",
    type: "Waste / Garbage",
    location: "Sector 12, Main Road",
    date: "2026-01-15",
    assigned: "Waste Management Team",
  },
  12346: {
    status: "Resolved",
    type: "Street Light",
    location: "Gandhi Nagar, Block C",
    date: "2026-01-14",
    assigned: "Electrical Department",
  },
};

const NexoraBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState('greeting');
  const [complaintData, setComplaintData] = useState({});
  const messagesEndRef = useRef(null);
  
  // Draggable state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = {
        id: 1,
        text: "Hello! I'm Nexora Bot 👋 — your AI assistant for NEXORA Smart City.\n\nHow can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          { text: '🚧 Report a Problem', action: 'report_problem' },
          { text: '📋 Check Status', action: 'check_status' },
          { text: '🌍 City Info', action: 'city_info' },
          { text: '🚨 Emergency', action: 'emergency' },
        ],
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  // Drag handlers
  const handleMouseDown = (e) => {
    if (e.target.closest('.chat-content')) return;
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { ...position };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;
    setPosition({
      x: initialPos.current.x + deltaX,
      y: initialPos.current.y + deltaY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.target.closest('.chat-content')) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };
    initialPos.current = { ...position };
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartPos.current.x;
    const deltaY = touch.clientY - dragStartPos.current.y;
    setPosition({
      x: initialPos.current.x + deltaX,
      y: initialPos.current.y + deltaY,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const problemTypes = [
    { text: '🗑️ Waste / Garbage', value: 'Waste / Garbage' },
    { text: '💧 Water Leakage', value: 'Water Leakage' },
    { text: '💡 Street Light', value: 'Street Light' },
    { text: '🚗 Traffic Issue', value: 'Traffic Issue' },
    { text: '🛣️ Road Damage', value: 'Road Damage' },
  ];

  const cityInfoOptions = [
    { text: '🌿 Air Quality', value: 'aqi' },
    { text: '🚗 Traffic', value: 'traffic' },
    { text: '💧 Water', value: 'water' },
    { text: '⚡ Power', value: 'power' },
  ];

  const generateComplaintId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-400' };
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-400' };
    if (aqi <= 150) return { level: 'Unhealthy', color: 'text-orange-400' };
    return { level: 'Very Unhealthy', color: 'text-red-400' };
  };

  const addBotMessage = (text, options = null, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        text,
        sender: 'bot',
        timestamp: new Date(),
        options,
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleOptionClick = (option) => {
    addUserMessage(option.text || option.value);

    switch (option.action || conversationState) {
      case 'report_problem':
        setConversationState('select_problem_type');
        addBotMessage(
          'What type of problem?',
          problemTypes.map((p) => ({
            text: p.text,
            value: p.value,
            action: 'problem_type_selected',
          }))
        );
        break;

      case 'problem_type_selected':
        setComplaintData((prev) => ({ ...prev, type: option.value }));
        setConversationState('ask_location');
        addBotMessage('📍 Please type your location:');
        break;

      case 'check_status':
        setConversationState('enter_complaint_id');
        addBotMessage('Enter your Complaint ID (e.g., #12345):');
        break;

      case 'city_info':
        setConversationState('select_city_info');
        addBotMessage(
          'What info do you need?',
          cityInfoOptions.map((c) => ({
            text: c.text,
            value: c.value,
            action: 'city_info_selected',
          }))
        );
        break;

      case 'city_info_selected':
        handleCityInfoRequest(option.value);
        break;

      case 'emergency':
        addBotMessage(
          '🚨 **Emergency Contacts:**\n\n📞 Police: 100\n🚑 Ambulance: 108\n🚒 Fire: 101\n\nNeed more help?',
          [
            { text: '🚧 Report Problem', action: 'report_problem' },
            { text: '👍 Thanks!', action: 'end_conversation' },
          ]
        );
        setConversationState('greeting');
        break;

      case 'end_conversation':
        addBotMessage('Thank you for using Nexora Bot! 👋 Have a great day!');
        setConversationState('ended');
        break;

      default:
        handleGeneralInput(option.text || option.value);
    }
  };

  const handleCityInfoRequest = (infoType) => {
    const iotData = getIoTData();
    let response = '';

    switch (infoType) {
      case 'aqi':
        const aqiInfo = getAQILevel(iotData.aqi);
        response = `🌿 **AQI:** ${iotData.aqi} (${aqiInfo.level})`;
        break;
      case 'traffic':
        response = `🚗 **Traffic Flow:** ${iotData.trafficFlow}% capacity`;
        break;
      case 'water':
        response = `💧 **Water Pressure:** ${iotData.waterPressure}% normal`;
        break;
      case 'power':
        response = `⚡ **Power Load:** ${iotData.powerLoad}%`;
        break;
    }

    addBotMessage(response);
    setTimeout(() => {
      addBotMessage('Anything else?', [
        { text: '🌍 More Info', action: 'city_info' },
        { text: '🚧 Report Problem', action: 'report_problem' },
        { text: '👍 Done', action: 'end_conversation' },
      ]);
      setConversationState('greeting');
    }, 1500);
  };

  const handleTextInput = () => {
    if (!inputText.trim()) return;

    const userInput = inputText.trim();
    addUserMessage(userInput);
    setInputText('');

    switch (conversationState) {
      case 'ask_location':
        setComplaintData((prev) => ({ ...prev, location: userInput }));
        setConversationState('ask_description');
        addBotMessage('📝 Brief description of the issue:');
        break;

      case 'ask_description':
        setComplaintData((prev) => ({ ...prev, description: userInput }));
        const newComplaintId = generateComplaintId();
        setComplaintData((prev) => ({ ...prev, complaintId: newComplaintId }));
        addBotMessage(
          `✅ **Registered!**\n\n🎫 ID: #${newComplaintId}\n📋 Type: ${complaintData.type}\n📍 Location: ${complaintData.location}`,
          [
            { text: '🚧 Report Another', action: 'report_problem' },
            { text: '👍 Done', action: 'end_conversation' },
          ]
        );
        setConversationState('greeting');
        break;

      case 'enter_complaint_id':
        const searchId = userInput.replace('#', '').trim();
        if (complaintsDB[searchId]) {
          const complaint = complaintsDB[searchId];
          addBotMessage(
            `📋 **Status for #${searchId}**\n\n🔄 Status: ${complaint.status}\n📍 Location: ${complaint.location}`,
            [
              { text: '🚧 Report Problem', action: 'report_problem' },
              { text: '👍 Done', action: 'end_conversation' },
            ]
          );
        } else {
          addBotMessage(`❌ ID #${searchId} not found.`, [
            { text: '🔄 Try Again', action: 'check_status' },
            { text: '🚧 Report New', action: 'report_problem' },
          ]);
        }
        setConversationState('greeting');
        break;

      default:
        handleGeneralInput(userInput);
    }
  };

  const handleGeneralInput = (input) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('aqi') || lowerInput.includes('air')) {
      handleCityInfoRequest('aqi');
    } else if (lowerInput.includes('traffic')) {
      handleCityInfoRequest('traffic');
    } else if (lowerInput.includes('water')) {
      handleCityInfoRequest('water');
    } else if (lowerInput.includes('power') || lowerInput.includes('electricity')) {
      handleCityInfoRequest('power');
    } else if (lowerInput.includes('report') || lowerInput.includes('problem')) {
      handleOptionClick({ action: 'report_problem' });
    } else if (lowerInput.includes('status') || lowerInput.includes('track')) {
      handleOptionClick({ action: 'check_status' });
    } else if (lowerInput.includes('emergency') || lowerInput.includes('help')) {
      handleOptionClick({ action: 'emergency' });
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      addBotMessage('Hello! 👋 How can I help?', [
        { text: '🚧 Report Problem', action: 'report_problem' },
        { text: '📋 Check Status', action: 'check_status' },
        { text: '🌍 City Info', action: 'city_info' },
      ]);
    } else {
      addBotMessage("I didn't understand. Try these:", [
        { text: '🚧 Report Problem', action: 'report_problem' },
        { text: '📋 Check Status', action: 'check_status' },
        { text: '🌍 City Info', action: 'city_info' },
      ]);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const resetConversation = () => {
    setConversationState('greeting');
    setComplaintData({});
    const greeting = {
      id: Date.now(),
      text: "Hello! I'm Nexora Bot 👋 — your AI assistant for NEXORA Smart City.\n\nHow can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      options: [
        { text: '🚧 Report a Problem', action: 'report_problem' },
        { text: '📋 Check Status', action: 'check_status' },
        { text: '🌍 City Info', action: 'city_info' },
        { text: '🚨 Emergency', action: 'emergency' },
      ],
    };
    setMessages([greeting]);
  };

  return (
    <div
      ref={dragRef}
      className="fixed z-[9999]"
      style={{
        bottom: `${24 - position.y}px`,
        right: `${24 - position.x}px`,
        cursor: isDragging ? 'grabbing' : 'auto',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mb-4 w-[360px] max-w-[calc(100vw-48px)] bg-[#0f172a] rounded-2xl shadow-2xl shadow-purple-500/20 border border-gray-700/50 overflow-hidden chat-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat Header */}
            <div 
              className="p-4 bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-emerald-900/80 border-b border-gray-700 flex justify-between items-center"
              style={{ cursor: 'grab' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-500 flex items-center justify-center text-lg shadow-lg">
                    🤖
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f172a]"></div>
                </div>
                <div>
                  <div className="font-semibold text-white">Nexora Bot</div>
                  <div className="text-xs text-emerald-400">Online • AI Assistant</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetConversation}
                  className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                  title="Reset"
                >
                  🔄
                </button>
                <Link
                  href="/chatbot"
                  className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                  title="Open Full Chat"
                >
                  ↗️
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-900/50 to-gray-900/80">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col max-w-[85%]">
                      <div
                        className={`px-3 py-2 rounded-2xl text-sm ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                            : 'bg-gray-800/80 text-gray-100 border border-gray-700/50 rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.text}</p>
                        <p className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>

                      {/* Option Buttons */}
                      {message.options && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {message.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleOptionClick(option)}
                              className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs hover:bg-purple-900/50 hover:border-purple-500/50 transition-all text-gray-200"
                            >
                              {option.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800/80 px-4 py-2 rounded-2xl rounded-bl-none border border-gray-700/50">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-gray-900/90 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTextInput()}
                  placeholder="Type a message..."
                  className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                />
                <button
                  onClick={handleTextInput}
                  className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 shadow-2xl shadow-purple-500/40 flex items-center justify-center text-2xl hover:shadow-purple-500/60 transition-all border-2 border-white/20 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              🤖
            </motion.span>
          )}
        </AnimatePresence>
        
        {/* Pulse animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping"></span>
        )}
      </motion.button>

      {/* Drag hint tooltip */}
      {!isOpen && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 bg-gray-900/90 px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Drag to move • Click to chat
        </div>
      )}
    </div>
  );
};

export default NexoraBotWidget;
