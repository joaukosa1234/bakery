"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: "Hi, I'm Bakery Assistant. Ask me something." },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [isOpen]);

  function openChat() {
    setIsOpen(true);
  }

  function closeChat() {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 220);
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");

    try {
      const res = await fetch("https://bakery-help.vercel.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `${data.reply} (v${data.version})` },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error." },
      ]);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f6f4ef",
        backgroundImage: `
          radial-gradient(circle at 10% 12%, rgba(0,0,0,0.07) 0 1px, transparent 1.8px),
          radial-gradient(circle at 28% 34%, rgba(0,0,0,0.05) 0 1.4px, transparent 2px),
          radial-gradient(circle at 67% 18%, rgba(0,0,0,0.06) 0 1.2px, transparent 2px),
          radial-gradient(circle at 83% 27%, rgba(0,0,0,0.05) 0 1.5px, transparent 2px),
          radial-gradient(circle at 16% 72%, rgba(0,0,0,0.05) 0 1.2px, transparent 2px),
          radial-gradient(circle at 58% 76%, rgba(0,0,0,0.06) 0 1.4px, transparent 2px),
          radial-gradient(circle at 88% 82%, rgba(0,0,0,0.05) 0 1.2px, transparent 2px)
        `,
        backgroundSize:
          "260px 260px, 340px 340px, 320px 320px, 380px 380px, 300px 300px, 360px 360px, 320px 320px",
        color: "#111",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "1720px",
          margin: "0 auto",
          padding: "24px 34px 140px",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            paddingBottom: "26px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "34px",
              fontSize: "18px",
              color: "#1a1a1a",
              flexWrap: "wrap",
            }}
          >
            <span>Valentines Pre Order</span>
            <span
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "9px",
              }}
            >
              Menu
            </span>
          </div>

          <div
            style={{
              fontSize: "24px",
              fontWeight: 500,
              letterSpacing: "0.2px",
              whiteSpace: "nowrap",
            }}
          >
            Butter Lane Bake Shop
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: "18px",
              whiteSpace: "nowrap",
            }}
          >
            <span>Login</span>
            <span>◎</span>
            <span>✉</span>
            <span>🛒 0</span>
          </div>
        </header>

        <main
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(520px, 1fr) minmax(520px, 1fr)",
            gap: "64px",
            alignItems: "start",
            paddingTop: "64px",
          }}
        >
          <section>
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 700,
                lineHeight: 1.02,
                margin: "0 0 30px 0",
                letterSpacing: "-1.8px",
              }}
            >
              Contact Us
            </h1>

            <p
              style={{
                fontSize: "24px",
                lineHeight: 1.7,
                maxWidth: "760px",
                margin: "0 0 44px 0",
              }}
            >
              Thank you for being interested in Butter Lane Bake Shop! We
              appreciate your thoughts and messages. To reach us, please see the
              following options for contacting our bakery:
            </p>

            <div
              style={{
                maxWidth: "770px",
                fontSize: "22px",
                lineHeight: 1.75,
              }}
            >
              <p style={{ margin: "0 0 18px 0" }}>
                <strong>Call us</strong> at (604)922-4472 during our business
                hours for immediate assistance or any inquiries. Our friendly
                staff is here to help with any questions or orders.
              </p>

              <p style={{ margin: "0 0 18px 0" }}>
                <strong>Email us</strong> at katie@butterlanebakeshop.com for
                questions, suggestions, or general inquiries. Our team will
                respond within 48 hours.
              </p>

              <p style={{ margin: "0 0 18px 0" }}>
                <strong>Connect with us</strong> on Instagram by following
                @ButterLaneBakeShop. Send us a direct message or leave a comment
                on our posts. We love interacting with our customers and sharing
                our latest creations!
              </p>

              <p style={{ margin: "0 0 26px 0" }}>
                <strong>Visit our bakery</strong> at 101-175 W 3rd St North
                Vancouver,
              </p>

              <div
                style={{
                  marginTop: "10px",
                  paddingLeft: "2px",
                  fontSize: "22px",
                  lineHeight: 1.9,
                }}
              >
                <div>
                  <strong>Sunday &amp; Monday</strong> CLOSED
                </div>
                <div>
                  <strong>Tuesday - Friday</strong> 8:30-3:30
                </div>
                <div>
                  <strong>Saturday</strong> 10-3
                </div>
              </div>

              <p style={{ margin: "28px 0 10px 0" }}>
                Or in the Lonsdale Quay Market,
              </p>

              <div
                style={{
                  fontSize: "22px",
                  lineHeight: 1.8,
                }}
              >
                <strong>7 days a week</strong> 10am-5pm.
              </div>
            </div>
          </section>

          <section>
            <div
              style={{
                fontSize: "24px",
                marginBottom: "18px",
                fontWeight: 500,
              }}
            >
              Name
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
                marginBottom: "30px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  First Name <span style={{ color: "#666" }}>(required)</span>
                </div>
                <div
                  style={{
                    height: "68px",
                    border: "1px solid #bdbdbd",
                    background: "rgba(255,255,255,0.24)",
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Last Name <span style={{ color: "#666" }}>(required)</span>
                </div>
                <div
                  style={{
                    height: "68px",
                    border: "1px solid #bdbdbd",
                    background: "rgba(255,255,255,0.24)",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <div
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              >
                Email <span style={{ color: "#666" }}>(required)</span>
              </div>
              <div
                style={{
                  height: "68px",
                  border: "1px solid #bdbdbd",
                  background: "rgba(255,255,255,0.24)",
                }}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <div
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              >
                Message <span style={{ color: "#666" }}>(required)</span>
              </div>
              <div
                style={{
                  height: "168px",
                  border: "1px solid #bdbdbd",
                  background: "rgba(255,255,255,0.24)",
                }}
              />
            </div>

            <button
              style={{
                width: "116px",
                height: "64px",
                borderRadius: "999px",
                border: "none",
                background: "#000",
                color: "#fff",
                fontSize: "20px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </section>
        </main>

        <section
          style={{
            marginTop: "120px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              maxWidth: "740px",
            }}
          >
            <h2
              style={{
                fontSize: "38px",
                margin: "0 0 20px 0",
                letterSpacing: "-0.6px",
              }}
            >
              Visit &amp; Pickup
            </h2>

            <p
              style={{
                fontSize: "22px",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Stop by the bakery for fresh pastries, cakes, and seasonal items.
              Our North Vancouver location and Lonsdale Quay Market location
              both offer a welcoming in-person experience for pickup and casual
              visits.
            </p>
          </div>

          <div
            style={{
              maxWidth: "740px",
            }}
          >
            <h2
              style={{
                fontSize: "38px",
                margin: "0 0 20px 0",
                letterSpacing: "-0.6px",
              }}
            >
              Orders &amp; Questions
            </h2>

            <p
              style={{
                fontSize: "22px",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              For custom cake requests, larger dessert orders, or event-related
              questions, reaching out early helps the bakery team prepare the
              best response and availability for your request.
            </p>
          </div>
        </section>

        <section
          style={{
            marginTop: "120px",
            maxWidth: "980px",
          }}
        >
          <h2
            style={{
              fontSize: "38px",
              margin: "0 0 20px 0",
              letterSpacing: "-0.6px",
            }}
          >
            Bakery Information
          </h2>

          <div
            style={{
              fontSize: "22px",
              lineHeight: 1.8,
            }}
          >
            <p style={{ margin: "0 0 16px 0" }}>
              Butter Lane Bake Shop is a local bakery experience focused on
              approachable service, seasonal baked goods, and custom orders for
              customers across North Vancouver.
            </p>

            <p style={{ margin: "0 0 16px 0" }}>
              This demo page is designed to simulate how a real client website
              might look when your reusable chat widget is installed and active
              on top of the page.
            </p>

            <p style={{ margin: 0 }}>
              Scroll this page and keep the chat open to demonstrate that the
              widget remains attached to the viewport just like a production
              install would.
            </p>
          </div>
        </section>

        <div style={{ height: "900px" }} />
      </div>

      {!isOpen && (
        <button
          onClick={openChat}
          aria-label="Open chat"
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px",
            width: "68px",
            height: "68px",
            borderRadius: "999px",
            border: "none",
            background: "#000",
            color: "#fff",
            fontSize: "30px",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
            zIndex: 9999,
            transition: "transform 0.18s ease, box-shadow 0.18s ease",
          }}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px",
            transform: isVisible
              ? "scale(0.9) translateY(0px)"
              : "scale(0.86) translateY(18px)",
            transformOrigin: "bottom right",
            opacity: isVisible ? 1 : 0,
            width: "360px",
            height: "540px",
            background: "#fff",
            border: "1px solid #d8d8d8",
            borderRadius: "24px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.16)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            transition:
              "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease",
          }}
        >
          <div
            style={{
              padding: "18px 18px 14px 18px",
              borderBottom: "1px solid #e6e6e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fff",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Bakery Assistant
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#777",
                  marginTop: "4px",
                }}
              >
                Usually replies instantly
              </div>
            </div>

            <button
              onClick={closeChat}
              aria-label="Collapse chat"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "999px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                color: "#444",
                transition: "background 0.18s ease, transform 0.18s ease",
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={{ display: "block" }}
              >
                <path
                  d="M2 2L8 8L14 2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px",
              background: "#fafafa",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {messages.map((message, index) => {
              const isUser = message.sender === "user";

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "14px 16px",
                      borderRadius: isUser
                        ? "18px 18px 6px 18px"
                        : "18px 18px 18px 6px",
                      background: isUser ? "#d9e9ff" : "#ececec",
                      color: "#111",
                      fontSize: "17px",
                      lineHeight: 1.45,
                      wordBreak: "break-word",
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              borderTop: "1px solid #e6e6e6",
              background: "#fff",
              padding: "14px",
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              style={{
                flex: 1,
                height: "52px",
                borderRadius: "16px",
                border: "1px solid #d8d8d8",
                padding: "0 16px",
                fontSize: "17px",
                outline: "none",
                background: "#fff",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                minWidth: "86px",
                height: "52px",
                borderRadius: "16px",
                border: "none",
                background: "#000",
                color: "#fff",
                fontSize: "18px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}