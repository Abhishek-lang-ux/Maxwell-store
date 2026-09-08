import { useEffect, useRef, useState } from "react";
import {
  Bot,
  MessageCircle,
  X,
  Send,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

function Chatbot({ products = [] }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 Welcome to Maxwell. I'm your Maxwell Assistant. How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  // ==========================================
  // FRONTEND DEMO AI LOGIC
  // Later this function can call your backend
  // ==========================================
  const getBotReply = (question) => {
    const q = question.toLowerCase().trim();

    // Greeting
    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey") ||
      q.includes("namaste")
    ) {
      return "Hello! 👋 How can I help you with Maxwell appliances?";
    }

    // Product count
    if (
      q.includes("product") &&
      (q.includes("how many") || q.includes("available"))
    ) {
      return `We currently have ${products.length || "several"} Maxwell products available in our catalogue. You can explore the Products section for the complete range.`;
    }

    // Chimney
    if (
      q.includes("chimney") ||
      q.includes("hood")
    ) {
      const chimneyProducts = products.filter((p) =>
        `${p.name} ${p.category} ${p.categoryGroup}`
          .toLowerCase()
          .includes("chimney")
      );

      if (chimneyProducts.length > 0) {
        return `We have chimney options including ${chimneyProducts
          .slice(0, 3)
          .map((p) => p.name)
          .join(", ")}. You can view their specifications in the Products section.`;
      }

      return "Maxwell offers kitchen chimney products. Please check our Products section for the current range.";
    }

    // Cooker
    if (
      q.includes("cooker") ||
      q.includes("pressure cooker")
    ) {
      return "Maxwell offers pressure cooker products designed for practical everyday cooking. Check our Products section to see the available models.";
    }

    // Mixer
    if (
      q.includes("mixer") ||
      q.includes("grinder")
    ) {
      const mixerProducts = products.filter((p) =>
        `${p.name} ${p.category} ${p.categoryGroup}`
          .toLowerCase()
          .includes("mixer")
      );

      if (mixerProducts.length > 0) {
        return `Our mixer range includes ${mixerProducts
          .slice(0, 3)
          .map((p) => p.name)
          .join(", ")}. Would you like to know about a specific model?`;
      }

      return "Maxwell has mixer-grinder options for everyday kitchen use. You can explore the available models in Products.";
    }

    // Fan
    if (
      q.includes("fan") ||
      q.includes("ceiling fan")
    ) {
      return "Maxwell also offers ceiling fan products. Please visit our Products section to see the available model and specifications.";
    }

    // Warranty
    if (
      q.includes("warranty") ||
      q.includes("guarantee")
    ) {
      const warrantyProducts = products.filter((p) => p.warranty);

      if (warrantyProducts.length > 0) {
        return "Warranty coverage varies by Maxwell product. Please open the product details to check the warranty applicable to each model.";
      }

      return "Warranty information depends on the specific Maxwell product. Please check the individual product details.";
    }

    // About Maxwell
    if (
      q.includes("about maxwell") ||
      q.includes("who is maxwell") ||
      q.includes("about company")
    ) {
      return "Maxwell is a home-appliance brand focused on practical, reliable and value-driven products for modern homes. You can learn more in our About Maxwell section.";
    }

    // Products navigation
    if (
      q.includes("show product") ||
      q.includes("view product") ||
      q.includes("browse product")
    ) {
      setTimeout(() => {
        document
          .getElementById("products")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 300);

      return "Sure! I've taken you to our Products section. 🛍️";
    }

    // Contact
    if (
      q.includes("contact") ||
      q.includes("support") ||
      q.includes("help")
    ) {
      setTimeout(() => {
        document
          .getElementById("contact")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 300);

      return "Of course. I've taken you to the Contact section where you can get in touch with Maxwell.";
    }

    // Search product by name/model
    const matchingProduct = products.find((product) => {
      const text = `${product.name} ${product.model} ${product.category}`.toLowerCase();

      return (
        text.includes(q) ||
        q.includes(String(product.name || "").toLowerCase()) ||
        q.includes(String(product.model || "").toLowerCase())
      );
    });

    if (matchingProduct) {
      return `${matchingProduct.name} (${matchingProduct.model || "Maxwell"}) — ${matchingProduct.spec || "Product details are available in our catalogue."}${matchingProduct.warranty ? ` Warranty: ${matchingProduct.warranty}.` : ""}`;
    }

    // Default
    return "I can help you with Maxwell products, product specifications, categories, warranty information, and navigation. Try asking something like “Show me mixers” or “What is the warranty?”";
  };

  const sendMessage = (text = input) => {
    const messageText = text.trim();

    if (!messageText || typing) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: messageText,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(messageText);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: reply,
        },
      ]);

      setTyping(false);
    }, 600);
  };

  const quickQuestions = [
    "Show me products",
    "Tell me about Maxwell",
    "What about warranty?",
  ];

  return (
    <>
      {/* =========================================
          FLOATING CHAT BUTTON
      ========================================= */}
      {!open && (
        <button
          className="maxwell-chat-button"
          onClick={() => setOpen(true)}
          aria-label="Open Maxwell Assistant"
        >
          <span className="chat-button-pulse"></span>
          <MessageCircle size={25} />
          <span className="chat-button-text">Maxwell AI</span>
        </button>
      )}

      {/* =========================================
          CHAT WINDOW
      ========================================= */}
      {open && (
        <div className="maxwell-chat-window">

          {/* HEADER */}
          <div className="maxwell-chat-header">
            <div className="maxwell-chat-brand">
              <div className="maxwell-chat-avatar">
                <Bot size={21} />
              </div>

              <div>
                <strong>Maxwell AI Assistant</strong>
                <span>
                  <i></i>
                  Online
                </span>
              </div>
            </div>

            <button
              className="maxwell-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={19} />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="maxwell-chat-messages">

            <div className="maxwell-chat-welcome">
              <Sparkles size={15} />
              <span>How can we help?</span>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`maxwell-message-row ${
                  message.sender === "user"
                    ? "user-message-row"
                    : "bot-message-row"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="message-mini-avatar">
                    <Bot size={13} />
                  </div>
                )}

                <div
                  className={`maxwell-message ${
                    message.sender === "user"
                      ? "user-message"
                      : "bot-message"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="maxwell-message-row bot-message-row">
                <div className="message-mini-avatar">
                  <Bot size={13} />
                </div>

                <div className="maxwell-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* QUICK QUESTIONS */}
          {messages.length <= 1 && (
            <div className="maxwell-quick-questions">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <div className="maxwell-chat-input-area">
            <div className="maxwell-chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask Maxwell anything..."
              />

              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || typing}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>

            <small>
              <ShoppingBag size={11} />
              Maxwell Home Appliances
            </small>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;