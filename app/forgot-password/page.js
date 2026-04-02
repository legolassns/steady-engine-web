"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  async function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --gold-dim: #8a6f30;
          --bg: #0A0A08;
          --bg2: #111110;
          --text: #F0EDE4;
          --text-muted: #8A8778;
          --text-dim: #4A4840;
          --border-dim: rgba(255,255,255,0.06);
        }
        body { background: var(--bg); color: var(--text); font-family: 'DM Mono', monospace; }
        input {
          width: 100%;
          background: var(--bg2);
          border: 1px solid var(--border-dim);
          color: var(--text);
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          padding: 0.9rem 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        input:focus { border-color: var(--gold-dim); }
        input::placeholder { color: var(--text-dim); }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card { animation: fadeUp 0.6s ease 0.1s both; }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: "1.25rem 2rem", borderBottom: "1px solid var(--border-dim)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.12em", color: "var(--gold)", textTransform: "uppercase" }}>
          Steady Engine
        </a>
        <a href="/login" style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          Back to sign in →
        </a>
      </nav>

      {/* FORM */}
      <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div className="card" style={{ width: "100%", maxWidth: 420 }}>

          {/* Header */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>
              Password reset
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.2rem", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              Reset your<br /><em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>password</em>.
            </h1>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Success */}
          {success ? (
            <div style={{ fontSize: "0.68rem", color: "#4ade80", padding: "0.75rem 1rem", border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.05)" }}>
              Check your email for a reset link.
            </div>
          ) : (
            <>
              {/* Input */}
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              {/* Error */}
              {error && (
                <div style={{ fontSize: "0.68rem", color: "#f87171", marginBottom: "1rem", padding: "0.75rem 1rem", border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.05)" }}>
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: "100%", padding: "1rem",
                  background: loading ? "var(--gold-dim)" : "var(--gold)",
                  color: "var(--bg)", border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  transition: "background 0.2s",
                }}
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}
