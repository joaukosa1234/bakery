"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("No response yet");

  async function sendMessage() {
    const res = await fetch("https://bakery-help.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(`${data.reply} (v${data.version})`);
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Bakery Website</h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type 1 or 2"
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={sendMessage}>Send</button>

      <p>Response: {response}</p>
    </div>
  );
}