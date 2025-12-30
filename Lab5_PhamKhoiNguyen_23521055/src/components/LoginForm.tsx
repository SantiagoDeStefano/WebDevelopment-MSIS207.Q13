import React, { useState } from "react";
import { login } from "../api/auth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      await login(email, password);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} aria-label="login form">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      <button type="submit" disabled={status === "loading"}>
        Submit
      </button>

      {status === "success" && <p>Welcome back!</p>}
      {status === "error" && <p>Invalid credentials</p>}
    </form>
  );
}
