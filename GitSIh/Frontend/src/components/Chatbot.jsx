import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I’m AgroBot. Ask me anything about smart farming 🌱",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini", //  lightweight + fast model
          messages: [
            {
              role: "system",
              content:
                "You are AgroBot, an assistant for smart agriculture in hilly regions. Keep answers short and helpful.",
            },
            ...newMessages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, //  load API key from .env
            "Content-Type": "application/json",
          },
        }
      );

      const reply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I couldn’t connect right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatbot}>
      {isOpen && (
        <div className={styles.chatbot__window}>
          <div className={styles.chatbot__messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.chatbot__message} ${
                  msg.sender === "user"
                    ? styles.chatbot__messageUser
                    : styles.chatbot__messageBot
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div
                className={`${styles.chatbot__message} ${styles.chatbot__messageBot}`}
              >
                🤖 Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.chatbot__input}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button
        className={styles.chatbot__toggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;
