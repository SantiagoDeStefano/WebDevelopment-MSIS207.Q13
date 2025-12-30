"use client";

import React, { useState } from "react";

export function SettingsToggle() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <section
      style={{
        padding: 16,
        borderRadius: 12,
        border: "1px solid #ddd",
        background: mode === "dark" ? "#111" : "#fff",
        color: mode === "dark" ? "#fff" : "#111",
      }}
    >
      <h3>Settings</h3>
      <p>Mode: {mode}</p>
      <button onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}>
        Toggle Dark/Light
      </button>
    </section>
  );
}
