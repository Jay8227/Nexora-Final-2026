import Layout from "../components/Layout";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  12347: {
    status: "Pending",
    type: "Water Leakage",
    location: "MG Road, Near Hospital",
    date: "2026-01-16",
    assigned: "Water Supply Division",
  },
  12348: {
    status: "Need More Info",
    type: "Road Damage",
    location: "Industrial Area",
    date: "2026-01-13",
    assigned: "PWD Team",
  },
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [conversationState, setConversationState] = useState("greeting");
  const [complaintData, setComplaintData] = useState({});
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    const greeting = {
      id: 1,
      text: "Hello! I'm Nexora Bot 👋 — your AI assistant for NEXORA Smart City.\n\nI can help you report issues, get city information, or check status updates.\n\nWhat would you like to do?",
      sender: "bot",
      timestamp: new Date(),
      options: [
        { text: "🚧 Report a Problem", action: "report_problem" },
        { text: "📋 Check Complaint Status", action: "check_status" },
        { text: "🌍 City Info (AQI, Traffic)", action: "city_info" },
        { text: "🚨 Emergency Help", action: "emergency" },
      ],
    };
    setMessages([greeting]);
  }, []);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "mr", name: "Marathi" },
  ];

  const problemTypes = [
    { text: "🗑️ Waste / Garbage", value: "Waste / Garbage" },
    { text: "💧 Water Leakage", value: "Water Leakage" },
    { text: "💡 Street Light", value: "Street Light" },
    { text: "🚗 Traffic Issue", value: "Traffic Issue" },
    { text: "🌫️ Air Pollution", value: "Air Pollution" },
    { text: "🛣️ Road Damage", value: "Road Damage" },
    { text: "📝 Other", value: "Other" },
  ];

  const cityInfoOptions = [
    { text: "🌿 Air Quality (AQI)", value: "aqi" },
    { text: "🚗 Traffic Status", value: "traffic" },
    { text: "💧 Water Supply", value: "water" },
    { text: "🅿️ Parking Availability", value: "parking" },
    { text: "⚡ Power Status", value: "power" },
  ];

  const generateComplaintId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const getAQILevel = (aqi) => {
    if (aqi <= 50)
      return {
        level: "Good",
        color: "text-green-400",
        advice: "Air quality is satisfactory. Great for outdoor activities!",
      };
    if (aqi <= 100)
      return {
        level: "Moderate",
        color: "text-yellow-400",
        advice:
          "Acceptable. Sensitive individuals should limit prolonged outdoor exertion.",
      };
    if (aqi <= 150)
      return {
        level: "Unhealthy for Sensitive Groups",
        color: "text-orange-400",
        advice: "Reduce outdoor activities if you have respiratory conditions.",
      };
    if (aqi <= 200)
      return {
        level: "Unhealthy",
        color: "text-red-400",
        advice:
          "Everyone may experience health effects. Limit outdoor exposure.",
      };
    return {
      level: "Very Unhealthy",
      color: "text-purple-400",
      advice: "Health alert! Stay indoors and use air purifiers.",
    };
  };

  const addBotMessage = (text, options = null, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        text,
        sender: "bot",
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
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleOptionClick = (option) => {
    addUserMessage(option.text || option.value);
    setShowQuickActions(false);

    switch (option.action || conversationState) {
      case "report_problem":
        setConversationState("select_problem_type");
        addBotMessage(
          "What type of problem are you reporting?",
          problemTypes.map((p) => ({
            text: p.text,
            value: p.value,
            action: "problem_type_selected",
          }))
        );
        break;

      case "problem_type_selected":
        setComplaintData((prev) => ({ ...prev, type: option.value }));
        setConversationState("ask_location");
        addBotMessage(
          "📍 Please type your location (street name, landmark, or area):"
        );
        break;

      case "check_status":
        setConversationState("enter_complaint_id");
        addBotMessage("Please enter your Complaint ID (e.g., #12345):");
        break;

      case "city_info":
        setConversationState("select_city_info");
        addBotMessage(
          "What information do you need?",
          cityInfoOptions.map((c) => ({
            text: c.text,
            value: c.value,
            action: "city_info_selected",
          }))
        );
        break;

      case "city_info_selected":
        handleCityInfoRequest(option.value);
        break;

      case "emergency":
        setConversationState("confirm_emergency");
        addBotMessage(
          "⚠️ Is this a real emergency (fire, gas leak, accident)?",
          [
            {
              text: "🚨 Yes, this is an emergency",
              action: "confirm_real_emergency",
            },
            { text: "❌ No, I need regular help", action: "not_emergency" },
          ]
        );
        break;

      case "confirm_real_emergency":
        handleEmergency();
        break;

      case "not_emergency":
        setConversationState("greeting");
        addBotMessage(
          "Okay, let me help you with regular assistance.\n\nWhat would you like to do?",
          [
            { text: "🚧 Report a Problem", action: "report_problem" },
            { text: "📋 Check Complaint Status", action: "check_status" },
            { text: "🌍 City Info", action: "city_info" },
          ]
        );
        break;

      case "track_status_yes":
        const id = complaintData.complaintId;
        addBotMessage(
          `You can track your complaint status anytime by:\n\n1️⃣ Visiting our portal and entering ID: #${id}\n2️⃣ Asking me "Check status #${id}"\n\nEstimated resolution time: 24-48 hours\n\nAnything else I can help with?`,
          [
            { text: "🚧 Report Another Problem", action: "report_problem" },
            { text: "🌍 City Info", action: "city_info" },
            { text: "👍 No, thanks!", action: "end_conversation" },
          ]
        );
        setConversationState("greeting");
        break;

      case "track_status_no":
      case "end_conversation":
        addBotMessage(
          "Thank you for using NEXORA Nexora Bot! 👋\n\nHave a great day and stay safe! Feel free to reach out anytime you need assistance."
        );
        setConversationState("ended");
        setTimeout(() => {
          setShowQuickActions(true);
        }, 2000);
        break;

      default:
        handleGeneralInput(option.text || option.value);
    }
  };

  const handleCityInfoRequest = (infoType) => {
    const iotData = getIoTData();
    let response = "";

    switch (infoType) {
      case "aqi":
        const aqiInfo = getAQILevel(iotData.aqi);
        response = `🌿 **Air Quality Index in Nexora**\n\n📊 Current AQI: **${iotData.aqi}** (${aqiInfo.level})\n\n💡 ${aqiInfo.advice}\n\n📍 Data from: Nexora Central Monitoring Station\n🕐 Updated: Just now`;
        break;
      case "traffic":
        const flowStatus =
          iotData.trafficFlow > 80
            ? "Heavy"
            : iotData.trafficFlow > 60
              ? "Moderate"
              : "Light";
        response = `🚗 **Traffic Status in Nexora**\n\n📊 Traffic Flow: **${iotData.trafficFlow
          }%** capacity (${flowStatus})\n\n🔴 Congested Areas:\n• MG Road Junction\n• Railway Station Area\n\n🟢 Clear Routes:\n• Ring Road\n• Industrial Bypass\n\n⏱️ Average commute time: ${Math.floor(
            iotData.trafficFlow / 3
          )} mins longer than usual`;
        break;
      case "water":
        response = `💧 **Water Supply Status**\n\n📊 Pressure: **${iotData.waterPressure}%** normal\n\n📅 Today's Schedule:\n• Morning: 6:00 AM - 9:00 AM\n• Evening: 5:00 PM - 8:00 PM\n\n⚠️ Areas with low pressure:\n• Sector 15 (Under maintenance)\n\n✅ All other areas: Normal supply`;
        break;
      case "parking":
        response = `🅿️ **Parking Availability**\n\n📊 Total Available Spots: **${iotData.parkingAvailable}**\n\n📍 Popular Locations:\n• Central Mall: 45 spots\n• Railway Station: 32 spots\n• City Center: 28 spots\n• Hospital Complex: 56 spots\n\n💡 Tip: Evening hours have more availability`;
        break;
      case "power":
        const powerStatus = iotData.powerLoad > 80 ? "High Load" : "Normal";
        response = `⚡ **Power Grid Status**\n\n📊 Current Load: **${iotData.powerLoad}%** (${powerStatus})\n\n✅ All areas: Power supply normal\n\n🔧 Scheduled Maintenance:\n• Sector 8: Jan 18, 10AM-2PM\n\n💡 Peak hours: 6PM - 10PM\nConsider reducing non-essential usage during peak hours.`;
        break;
    }

    addBotMessage(response);
    setTimeout(() => {
      addBotMessage("Would you like to know anything else?", [
        { text: "🌍 More City Info", action: "city_info" },
        { text: "🚧 Report a Problem", action: "report_problem" },
        { text: "👍 No, thanks!", action: "end_conversation" },
      ]);
      setConversationState("greeting");
    }, 2000);
  };

  const handleEmergency = () => {
    addBotMessage(
      "🚨 **EMERGENCY ALERT TRIGGERED**\n\n📍 Sending your location to emergency services...\n\n🚑 Ambulance\n🚒 Fire Department\n👮 Police\n\n✅ Alert sent successfully!\n\n📞 Emergency contacts:\n• Police: 100\n• Ambulance: 108\n• Fire: 101\n\n⚠️ Please stay calm and stay in a safe location. Help is on the way!",
      null,
      2000
    );

    setTimeout(() => {
      addBotMessage(
        "🆘 A rescue team has been dispatched.\n\nEstimated arrival: 5-8 minutes\n\nStay on this chat if you need to provide more details.",
        [
          { text: "📍 Update My Location", action: "update_location" },
          { text: "📝 Provide More Details", action: "provide_details" },
          { text: "✅ Help Arrived", action: "end_conversation" },
        ]
      );
      setConversationState("emergency_active");
    }, 4000);
  };

  const handleTextInput = () => {
    if (!inputText.trim()) return;

    const userInput = inputText.trim();
    addUserMessage(userInput);
    setInputText("");

    switch (conversationState) {
      case "ask_location":
        setComplaintData((prev) => ({ ...prev, location: userInput }));
        setConversationState("ask_description");
        addBotMessage("📝 Please describe the issue in one sentence:");
        break;

      case "ask_description":
        setComplaintData((prev) => ({ ...prev, description: userInput }));
        setConversationState("generating_ticket");
        addBotMessage(
          "Thanks! I'm creating your report. One moment... ⏳",
          null,
          1000
        );

        setTimeout(() => {
          const newComplaintId = generateComplaintId();
          setComplaintData((prev) => ({
            ...prev,
            complaintId: newComplaintId,
          }));
          addBotMessage(
            `✅ **Complaint Registered Successfully!**\n\n🎫 **Complaint ID: #${newComplaintId}**\n\n📋 Type: ${complaintData.type
            }\n📍 Location: ${complaintData.location
            }\n📝 Description: ${userInput}\n📅 Date: ${new Date().toLocaleDateString()}\n\n📧 A confirmation has been sent to your registered contact.\n\nWould you like to track the status?`,
            [
              { text: "✅ Yes, show me how", action: "track_status_yes" },
              { text: "❌ No, I'm done", action: "track_status_no" },
            ]
          );
          setConversationState("ask_track");
        }, 2500);
        break;

      case "enter_complaint_id":
        const searchId = userInput.replace("#", "").trim();
        if (complaintsDB[searchId]) {
          const complaint = complaintsDB[searchId];
          const statusEmoji = {
            Pending: "⏳",
            "In Progress": "🔄",
            Resolved: "✅",
            "Need More Info": "❓",
          };
          addBotMessage(
            `📋 **Complaint Status**\n\n🎫 ID: #${searchId}\n${statusEmoji[complaint.status]
            } Status: **${complaint.status}**\n📋 Type: ${complaint.type
            }\n📍 Location: ${complaint.location}\n📅 Reported: ${complaint.date
            }\n👷 Assigned: ${complaint.assigned}${complaint.status === "Need More Info"
              ? "\n\n⚠️ We need additional information. Would you like to provide more details?"
              : ""
            }`,
            complaint.status === "Need More Info"
              ? [
                { text: "📸 Upload Photo", action: "upload_photo" },
                { text: "📝 Add Description", action: "add_description" },
              ]
              : [
                { text: "🚧 Report New Problem", action: "report_problem" },
                { text: "🌍 City Info", action: "city_info" },
                { text: "👍 No, thanks!", action: "end_conversation" },
              ]
          );
        } else {
          addBotMessage(
            `❌ Sorry, I couldn't find a complaint with ID #${searchId}.\n\nPlease check the ID and try again, or would you like to report a new issue?`,
            [
              { text: "🔄 Try Another ID", action: "check_status" },
              { text: "🚧 Report New Problem", action: "report_problem" },
              { text: "🏠 Back to Menu", action: "back_to_menu" },
            ]
          );
        }
        setConversationState("greeting");
        break;

      default:
        handleGeneralInput(userInput);
    }
  };

  const handleGeneralInput = (input) => {
    const lowerInput = input.toLowerCase();

    // Natural Language Understanding
    if (
      lowerInput.includes("aqi") ||
      lowerInput.includes("air quality") ||
      lowerInput.includes("pollution")
    ) {
      handleCityInfoRequest("aqi");
    } else if (
      lowerInput.includes("traffic") ||
      lowerInput.includes("congestion") ||
      lowerInput.includes("road")
    ) {
      handleCityInfoRequest("traffic");
    } else if (lowerInput.includes("water") || lowerInput.includes("supply")) {
      handleCityInfoRequest("water");
    } else if (lowerInput.includes("parking") || lowerInput.includes("park")) {
      handleCityInfoRequest("parking");
    } else if (
      lowerInput.includes("power") ||
      lowerInput.includes("electricity") ||
      lowerInput.includes("light")
    ) {
      handleCityInfoRequest("power");
    } else if (
      lowerInput.includes("report") ||
      lowerInput.includes("complaint") ||
      lowerInput.includes("problem") ||
      lowerInput.includes("issue")
    ) {
      handleOptionClick({ action: "report_problem" });
    } else if (
      lowerInput.includes("status") ||
      lowerInput.includes("track") ||
      lowerInput.includes("check")
    ) {
      handleOptionClick({ action: "check_status" });
    } else if (
      lowerInput.includes("emergency") ||
      lowerInput.includes("help") ||
      lowerInput.includes("urgent")
    ) {
      handleOptionClick({ action: "emergency" });
    } else if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("hey")
    ) {
      addBotMessage("Hello! 👋 How can I help you today?", [
        { text: "🚧 Report a Problem", action: "report_problem" },
        { text: "📋 Check Status", action: "check_status" },
        { text: "🌍 City Info", action: "city_info" },
        { text: "🚨 Emergency", action: "emergency" },
      ]);
    } else if (
      lowerInput.includes("thank") ||
      lowerInput.includes("bye") ||
      lowerInput.includes("done")
    ) {
      handleOptionClick({ action: "end_conversation" });
    } else {
      // Fallback response
      addBotMessage(
        'I\'m sorry, I didn\'t quite understand that. Could you rephrase or choose an option below?\n\n💡 You can ask me things like:\n• "What\'s the AQI today?"\n• "I want to report garbage"\n• "Check status #12345"\n• "Traffic update"',
        [
          { text: "🚧 Report a Problem", action: "report_problem" },
          { text: "📋 Check Status", action: "check_status" },
          { text: "🌍 City Info", action: "city_info" },
          { text: "🚨 Emergency", action: "emergency" },
        ]
      );
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const resetConversation = () => {
    setConversationState("greeting");
    setComplaintData({});
    setShowQuickActions(true);
    const greeting = {
      id: Date.now(),
      text: "Hello! I'm Nexora Bot 👋 — your AI assistant for NEXORA Smart City.\n\nI can help you report issues, get city information, or check status updates.\n\nWhat would you like to do?",
      sender: "bot",
      timestamp: new Date(),
      options: [
        { text: "🚧 Report a Problem", action: "report_problem" },
        { text: "📋 Check Complaint Status", action: "check_status" },
        { text: "🌍 City Info (AQI, Traffic)", action: "city_info" },
        { text: "🚨 Emergency Help", action: "emergency" },
      ],
    };
    setMessages([greeting]);
  };

  return (
    <Layout title="Nexora Bot - AI Assistant">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-full mb-4 shadow-lg shadow-purple-500/30">
              <span className="text-4xl">🤖</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text">
              Nexora Bot AI Assistant
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Your 24/7 Neural City Assistant for Nexora, Maharashtra
            </p>
          </motion.div>

          {/* Chat Container */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl shadow-black/50">
              {/* Chat Header */}
              <div className="p-4 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-emerald-900/50 border-b border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                  </div>
                  <span className="font-medium">Nexora Bot Online</span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full">
                    AI Powered
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className="bg-[var(--background-dark)] border border-gray-700 rounded-lg px-3 py-1 text-sm text-white focus:ring-2 focus:ring-purple-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`p-2 rounded-lg transition-all ${voiceEnabled
                      ? "bg-purple-500/20 text-purple-400 ring-2 ring-purple-500"
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                      }`}
                  >
                    {voiceEnabled ? "🎤" : "🔇"}
                  </button>

                  <button
                    onClick={resetConversation}
                    className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-all"
                    title="Reset Conversation"
                  >
                    🔄
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-900/80">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                        }`}
                    >
                      <div className="flex flex-col max-w-xs lg:max-w-md">
                        <div
                          className={`px-4 py-3 rounded-2xl ${message.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-br-none"
                            : "bg-[var(--background-dark)]/80 text-[var(--text-primary)] border border-gray-700/50 rounded-bl-none backdrop-blur-sm"
                            }`}
                        >
                          <p className="whitespace-pre-line">{message.text}</p>
                          <p
                            className={`text-xs mt-2 ${message.sender === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                              }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>

                        {/* Option Buttons */}
                        {message.options && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-2 mt-3"
                          >
                            {message.options.map((option, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl text-sm hover:from-blue-900/50 hover:to-purple-900/50 hover:border-purple-500/50 transition-all text-left"
                              >
                                {option.text}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
                    >
                      <div className="bg-[var(--background-dark)]/80 text-[var(--text-primary)] border border-gray-700/50 px-4 py-3 rounded-2xl rounded-bl-none backdrop-blur-sm">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTextInput()}
                    placeholder="Type your message or ask anything..."
                    className="flex-1 p-4 bg-[var(--background-dark)] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTextInput}
                    className="px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
                  >
                    Send ➤
                  </motion.button>
                </div>

                {/* Quick Tips */}
                <div className="mt-3 text-xs text-gray-500 text-center">
                  💡 Try: "What's the AQI?" • "Report garbage" • "Traffic
                  update" • "Check status #12345"
                </div>
              </div>
            </div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
            >
              <div className="glass-card p-5 rounded-xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-colors">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="text-sm font-semibold mb-1">AI-Powered NLU</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Understands natural language queries
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-gray-700/50 text-center hover:border-emerald-500/50 transition-colors">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-sm font-semibold mb-1">Live IoT Data</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Real-time city metrics from sensors
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-gray-700/50 text-center hover:border-purple-500/50 transition-colors">
                <div className="text-3xl mb-3">🎫</div>
                <h3 className="text-sm font-semibold mb-1">Smart Ticketing</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Automated complaint registration
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-gray-700/50 text-center hover:border-red-500/50 transition-colors">
                <div className="text-3xl mb-3">🚨</div>
                <h3 className="text-sm font-semibold mb-1">
                  Emergency Response
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Instant alert to city services
                </p>
              </div>
            </motion.div>

            {/* Conversation Flow Visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass-card rounded-2xl border border-gray-700/50 p-6 mt-8"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🔄</span>
                <span>Conversation Flow</span>
              </h2>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    1
                  </div>
                  <span>Greeting</span>
                  <span className="text-gray-500">→</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    2
                  </div>
                  <span>Choose Action</span>
                  <span className="text-gray-500">→</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    3
                  </div>
                  <span>Gather Info</span>
                  <span className="text-gray-500">→</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                    4
                  </div>
                  <span>Process</span>
                  <span className="text-gray-500">→</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    5
                  </div>
                  <span>Confirm</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
