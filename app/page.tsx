"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question:
      "I HAVE A NEW CAR; DO I NEED TO TAKE IT TO A DEALERSHIP FOR MAINTENANCE IN ORDER TO KEEP MY WARRANTY VALID?",
    answer:
      "No. Regular maintenance does not have to be performed at the dealership to keep your warranty valid, as long as the service follows the manufacturer schedule and is properly documented.",
  },
  {
    question:
      "WHAT DO I HAVE TO DO TO KEEP MY CAR OR TRUCK'S WARRANTY IN EFFECT?",
    answer:
      "Follow the maintenance schedule in your owner's manual and keep records of the services performed, including dates, mileage, and invoices.",
  },
  {
    question:
      "MY CAR IS A LEASED VEHICLE. AM I RESPONSIBLE FOR MAINTENANCE?",
    answer:
      "Yes. Lease agreements still require the vehicle to be maintained according to the manufacturer recommendations during the lease term.",
  },
  {
    question:
      "WHAT PARTS SHOULD BE REPLACED AND AT WHAT INTERVALS SHOULD THESE SERVICES BE PERFORMED?",
    answer:
      "That depends on the year, make, and model of the vehicle. The correct intervals are listed in your owner's manual, and severe driving conditions may require shorter intervals.",
  },
  {
    question:
      "WHAT IF MY NEW CAR NEEDS REPAIRS OTHER THAN REGULARLY SCHEDULED MAINTENANCE SUCH AS A BRAKE JOB OR OTHER REPAIRS? DO I HAVE TO RETURN TO THE DEALER FOR THESE REPAIRS? WHAT IF THESE REPAIRS ARE COVERED UNDER MY WARRANTY?",
    answer:
      "You can usually choose an independent repair shop for non-warranty repairs. If a repair is covered by the manufacturer's warranty, the dealer may still need to handle that specific warranty claim.",
  },
  {
    question: "DOES BRAKE FLUID REALLY NEED TO BE CHANGED?",
    answer:
      "Yes. Brake fluid absorbs moisture over time, which can reduce braking performance and contribute to corrosion inside the brake system.",
  },
  {
    question: "HOW OFTEN SHOULD ANTIFREEZE BE REPLACED?",
    answer:
      "Coolant replacement depends on the vehicle and coolant type. Many vehicles have long-life coolant, but the exact interval should be checked in the owner's manual.",
  },
];

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: "Hi, I'm Lex Auto Assistant. Ask me something." },
  ]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(1);

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
      const res = await fetch("https://YOUR-LEX-AUTO-BACKEND.vercel.app/api/chat", {
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
        background: "#ececec",
        color: "#111",
        fontFamily:
          'Arial, Helvetica, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          background: "#111",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            padding: "0 32px",
            minHeight: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "0.2px",
            }}
          >
            Monday-Saturday{" "}
            <span style={{ color: "#f0d10b" }}>10:00AM - 6:30PM</span>
          </div>

          <button
            style={{
              background: "#f0d10b",
              color: "#111",
              border: "none",
              padding: "18px 34px",
              fontSize: "22px",
              fontWeight: 700,
              cursor: "pointer",
              borderBottomLeftRadius: "34px",
            }}
          >
            ➜ APPOINTMENT
          </button>
        </div>
      </div>

      <header
        style={{
          background:
            "linear-gradient(90deg, rgba(8,8,8,1) 0%, rgba(26,26,26,1) 60%, rgba(54,54,54,1) 100%)",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "58px",
                fontWeight: 900,
                lineHeight: 1,
                color: "#f0d10b",
                textTransform: "uppercase",
                letterSpacing: "-1px",
              }}
            >
              Lex Auto
            </div>
            <div
              style={{
                fontSize: "24px",
                letterSpacing: "6px",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              Solutions
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: "22px",
                textTransform: "uppercase",
                opacity: 0.95,
              }}
            >
              Schedule your appointment today
            </div>
            <div
              style={{
                fontSize: "56px",
                fontWeight: 300,
                lineHeight: 1.05,
                marginTop: "4px",
              }}
            >
              604-303-9020
            </div>
          </div>
        </div>
      </header>

      <nav
        style={{
          background: "#efefef",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            alignItems: "stretch",
            overflowX: "auto",
          }}
        >
          {[
            "Home",
            "About Us",
            "Services",
            "Pricing & Coupons",
            "Blog",
            "Gallery",
            "Testimonials",
            "FAQ",
            "Shop",
            "Contacts",
          ].map((item) => (
            <div
              key={item}
              style={{
                padding: "24px 22px",
                fontSize: "18px",
                whiteSpace: "nowrap",
                background: item === "FAQ" ? "#f0d10b" : "transparent",
                fontWeight: item === "FAQ" ? 700 : 500,
              }}
            >
              {item}
            </div>
          ))}

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              padding: "0 10px 0 20px",
              fontSize: "30px",
              color: "#444",
            }}
          >
            ⌕
          </div>
        </div>
      </nav>

      <section
        style={{
          background:
            "linear-gradient(180deg, rgba(32,32,32,1) 0%, rgba(26,26,26,1) 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            padding: "70px 32px 80px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              marginBottom: "20px",
              opacity: 0.92,
            }}
          >
            Home / Frequently Asked Question
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "78px",
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: "-2px",
            }}
          >
            Frequently{" "}
            <span style={{ color: "#f0d10b", fontWeight: 500 }}>Asked Question</span>
          </h1>

          <p
            style={{
              fontSize: "24px",
              lineHeight: 1.75,
              maxWidth: "1220px",
              margin: "28px 0 0 0",
              color: "rgba(255,255,255,0.82)",
            }}
          >
            At Lex Auto Solutions we want to make servicing as simple, and hassle
            free as possible. Below are some frequently asked questions. If your
            question isn't listed below, please do not hesitate to contact our
            Customer Service team on 604-303-9020.
          </p>
        </div>
      </section>

      <main
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "40px 32px 100px",
        }}
      >
        {FAQS.map((faq, index) => {
          const isOpenFaq = openFaqIndex === index;

          return (
            <div
              key={faq.question}
              style={{
                borderTop: "2px solid #dfc126",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "28px",
                  alignItems: "flex-start",
                  padding: "34px 0",
                }}
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(isOpenFaq ? -1 : index)
                  }
                  style={{
                    width: "110px",
                    height: "110px",
                    border: "none",
                    background: "#f0d10b",
                    color: "#111",
                    fontSize: "58px",
                    lineHeight: 1,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                  aria-label={isOpenFaq ? "Collapse FAQ" : "Expand FAQ"}
                >
                  {isOpenFaq ? "−" : "+"}
                </button>

                <div style={{ flex: 1, paddingTop: "4px" }}>
                  <div
                    style={{
                      fontSize: "29px",
                      lineHeight: 1.35,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      color: isOpenFaq ? "#d8b600" : "#111",
                    }}
                  >
                    {faq.question}
                  </div>

                  {isOpenFaq && (
                    <div
                      style={{
                        marginTop: "30px",
                        fontSize: "24px",
                        lineHeight: 1.8,
                        color: "#222",
                        maxWidth: "1280px",
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <footer
        style={{
          background: "#222",
          color: "#fff",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            padding: "70px 32px 56px",
          }}
        >
          <div
            style={{
              fontSize: "46px",
              marginBottom: "34px",
            }}
          >
            Call: <span style={{ color: "#f0d10b", fontWeight: 700 }}>604-303-9020</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "22px",
              fontSize: "28px",
              lineHeight: 1.5,
            }}
          >
            <div>📍 5-11220 Voyageur Way, Richmond BC V6X 3E1</div>
            <div>
              🕘 Monday-Saturday <span style={{ color: "#f0d10b" }}>10:00AM - 6:30PM</span>
              <br />
              Sunday Closed
            </div>
            <div>✉ sales@lexauto.org</div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "36px",
            }}
          >
            {["f", "t", "g+", "▶", "◎", "t", "Be", "in"].map((icon) => (
              <div
                key={icon}
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "999px",
                  background: "#f0d10b",
                  color: "#111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 700,
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#000",
            textAlign: "center",
            padding: "22px 16px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          © 2021 Lex Auto Solutions, All Rights Reserved
        </div>
      </footer>

      {!isOpen && (
        <button
          onClick={openChat}
          aria-label="Open chat"
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px",
            width: "78px",
            height: "78px",
            borderRadius: "999px",
            border: "none",
            background: "#f0d10b",
            color: "#111",
            fontSize: "34px",
            cursor: "pointer",
            boxShadow: "0 14px 34px rgba(0,0,0,0.28)",
            zIndex: 9999,
          }}
        >
          🚗
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px",
            transform: isVisible
              ? "scale(0.98) translateY(0px)"
              : "scale(0.92) translateY(18px)",
            transformOrigin: "bottom right",
            opacity: isVisible ? 1 : 0,
            width: "370px",
            height: "560px",
            background: "#fff",
            border: "1px solid #d8d8d8",
            borderRadius: "24px",
            boxShadow: "0 22px 54px rgba(0,0,0,0.22)",
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
              borderBottom: "1px solid #ececec",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#111",
              color: "#fff",
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
                Lex Auto Assistant
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.72)",
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
                border: "1px solid rgba(255,255,255,0.2)",
                background: "#1b1b1b",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                color: "#fff",
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
              background: "#f7f7f7",
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
                      maxWidth: "80%",
                      padding: "14px 16px",
                      borderRadius: isUser
                        ? "18px 18px 6px 18px"
                        : "18px 18px 18px 6px",
                      background: isUser ? "#f0d10b" : "#e8e8e8",
                      color: "#111",
                      fontSize: "16px",
                      lineHeight: 1.5,
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
              placeholder="Ask about services, hours..."
              style={{
                flex: 1,
                height: "52px",
                borderRadius: "16px",
                border: "1px solid #d8d8d8",
                padding: "0 16px",
                fontSize: "16px",
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
                background: "#111",
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