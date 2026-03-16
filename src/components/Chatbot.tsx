import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiUser } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  time: string;
}

const BOT_NAME = "Sourish's AI";

const KNOWLEDGE: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/who are you|what is this|about (the )?bot/i],
    answer: "I'm Sourish's portfolio assistant! I can tell you anything about his skills, projects, experience, and more. What would you like to know? 🤖",
  },
  {
    patterns: [/who is sourish|about sourish|tell me about/i],
    answer: "Sourish Harh is a passionate Full Stack Web Developer and Software Engineer from India 🇮🇳. He completed his B.Tech in Computer Science (Data Science) from Brainware University in 2026 and loves building elegant digital experiences with clean, efficient code.",
  },
  {
    patterns: [/skill|tech|stack|know|language|use/i],
    answer: "Sourish's tech stack includes:\n• **Frontend:** React, HTML, CSS, Tailwind CSS\n• **Backend:** Node.js, Express.js\n• **Languages:** JavaScript, Python, Java\n• **Database:** MySQL, MongoDB\n• **Tools:** Git, GitHub, Postman\n\nHe specializes in full-stack web development! 💻",
  },
  {
    patterns: [/project|built|made|work|portfolio/i],
    answer: "Sourish has built some cool projects:\n\n📄 **Smart Resume Builder** — AI-powered resume generator\n🔐 **Password Manager** — Secure credential storage app\n🤖 **PDF Chatbot** — Chat with multiple PDF documents using AI\n\nCheck out the Projects section for details!",
  },
  {
    patterns: [/resume builder|smart resume/i],
    answer: "**Smart Resume Builder** is an AI-powered tool that helps users generate professional resumes quickly using intelligent templates and smart suggestions. Built with React & AI technology. 📄",
  },
  {
    patterns: [/password manager/i],
    answer: "**Password Manager** is a secure application for storing and managing credentials safely. It features encryption and an intuitive interface for organized credential management. 🔐",
  },
  {
    patterns: [/pdf chatbot|chat.*pdf/i],
    answer: "**PDF Chatbot** lets you upload multiple PDFs and have intelligent conversations with your documents using AI. A great tool for researchers and students! 🤖",
  },
  {
    patterns: [/contact|reach|email|hire|available/i],
    answer: "You can reach Sourish through:\n\n📧 **Email** — harhsourish3@gmail.com\n💼 **LinkedIn** — linkedin.com/in/sourish-harh-86298124b\n🐱 **GitHub** — github.com/Sourishharh\n\nHe's open to opportunities and collaborations!",
  },
  {
    patterns: [/github|code|repository/i],
    answer: "You can find all of Sourish's projects on GitHub at **github.com/Sourishharh** 🐱. He actively shares his work and open-source contributions there!",
  },
  {
    patterns: [/linkedin/i],
    answer: "Connect with Sourish on **LinkedIn** at linkedin.com/in/sourish-harh-86298124b 💼. He loves networking with fellow developers and tech enthusiasts!",
  },
  {
    patterns: [/education|study|college|university|btech|degree/i],
    answer: "Sourish completed his **B.Tech in Computer Science (Data Science)** from Brainware University in 2026 with a CGPA of 8.42 🎓. His academic journey equipped him with strong fundamentals in software engineering, DSA, DBMS, and modern web development.",
  },
  {
    patterns: [/react|frontend|ui/i],
    answer: "React is one of Sourish's strongest skills! He builds dynamic, responsive UIs with React, Tailwind CSS, and Framer Motion for smooth animations — like this very portfolio! ⚛️",
  },
  {
    patterns: [/node|express|backend|server/i],
    answer: "For backend development, Sourish uses **Node.js** and **Express.js** to build robust REST APIs and server-side applications. He pairs them with MongoDB for data storage. 🚀",
  },
  {
    patterns: [/hello|hi|hey|greet/i],
    answer: "Hey there! 👋 I'm Sourish's portfolio assistant. I can answer questions about his skills, projects, education, and contact info. What would you like to know?",
  },
  {
    patterns: [/thank|thanks|great|awesome|cool/i],
    answer: "You're welcome! 😊 If you have more questions about Sourish, feel free to ask anytime. And don't forget to check out the contact section if you'd like to get in touch!",
  },
  {
    patterns: [/location|from|india|country/i],
    answer: "Sourish is from **India** 🇮🇳. He's passionate about contributing to the global tech community and is open to remote opportunities worldwide!",
  },
  {
    patterns: [/experience|work|internship|job/i],
    answer: "Sourish is a passionate developer with hands-on project experience in full-stack development. He's built real-world apps and is actively looking for opportunities to grow and contribute! 🌟",
  },
];

const QUICK_QUESTIONS = [
  "Tell me about Sourish",
  "What are his skills?",
  "Show me his projects",
  "How to contact him?",
];

function getAnswer(input: string): string {
  for (const entry of KNOWLEDGE) {
    if (entry.patterns.some((p) => p.test(input))) return entry.answer;
  }
  return "Great question! I'm not sure about that specific detail, but you can explore the portfolio sections above or reach out to Sourish directly via the Contact section. He'd love to hear from you! 😊";
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function BotMessage({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="text-sm leading-relaxed text-gray-200 space-y-1">
      {lines.map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i}>
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <span key={j} className="font-semibold text-purple-300">
                  {part}
                </span>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi! 👋 I'm Sourish's AI assistant. Ask me anything about his skills, projects, or how to contact him!",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: q, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const answer = getAnswer(q);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", text: answer, time: formatTime() },
      ]);
      setTyping(false);
    }, 700 + Math.random() * 400);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
          boxShadow: "0 0 30px rgba(139,92,246,0.5), 0 0 60px rgba(139,92,246,0.2)",
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={open ? {} : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RiRobot2Line size={24} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-purple-400"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-3xl overflow-hidden"
            style={{
              boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.2)",
            }}
          >
            {/* Header */}
            <div
              className="relative px-5 py-4 flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.9), rgba(6,182,212,0.7))",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Animated bg orb */}
              <motion.div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <RiRobot2Line size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm leading-tight">{BOT_NAME}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/70 text-xs">Always online</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="h-80 overflow-y-auto px-4 py-4 space-y-4 flex flex-col"
              style={{
                background: "rgba(10,10,20,0.95)",
                backdropFilter: "blur(20px)",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                        msg.role === "bot"
                          ? "bg-gradient-to-br from-purple-500 to-cyan-500"
                          : "bg-gradient-to-br from-violet-600 to-purple-800"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        <RiRobot2Line size={14} className="text-white" />
                      ) : (
                        <FiUser size={13} className="text-white" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div
                        className={`px-4 py-2.5 rounded-2xl ${
                          msg.role === "user"
                            ? "rounded-br-sm text-white"
                            : "rounded-bl-sm text-gray-200"
                        }`}
                        style={
                          msg.role === "user"
                            ? { background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }
                            : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }
                        }
                      >
                        {msg.role === "bot" ? (
                          <BotMessage text={msg.text} />
                        ) : (
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-600 px-1">{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                      <RiRobot2Line size={14} className="text-white" />
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-purple-400"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Quick Questions */}
            <div
              className="px-3 py-2 flex gap-2 overflow-x-auto scrollbar-none"
              style={{ background: "rgba(10,10,20,0.95)" }}
            >
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/15 hover:border-purple-400/50 transition-all duration-200 whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              className="px-3 pb-3"
              style={{ background: "rgba(10,10,20,0.95)" }}
            >
              <div
                className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(139,92,246,0.25)",
                }}
              >
                <FiMessageSquare size={15} className="text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none"
                />
                <motion.button
                  onClick={() => send(input)}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-30 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiSend size={14} className="text-white translate-x-px -translate-y-px" />
                </motion.button>
              </div>
              <p className="text-center text-xs text-gray-700 mt-2">
                Powered by Sourish's Portfolio AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
