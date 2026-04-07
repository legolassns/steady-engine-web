"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleRegister() {
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        setError("already_exists");
      } else {
        setError(error.message);
      }
    } else {
      // Create user record with trial
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 30);
      await supabase.from("users").upsert({
        id: data.user.id,
        email: email,
        plan: "trial",
        is_active: true,
        subscription_ends_at: trialEndsAt.toISOString(),
      });
      setMessage("If this is a new account, check your email to confirm. If you already have an account, sign in instead.");
    }
    setLoading(false);
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
          --border-gold: rgba(201,168,76,0.2);
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
          Already have an account →
        </a>
      </nav>

      {/* FORM */}
      <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div className="card" style={{ width: "100%", maxWidth: 420 }}>

          {/* Header */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>
              Free trial — 30 days
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.2rem", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              Start your<br /><em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>free trial</em>.
            </h1>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
              No credit card required. Real signals on a live market from day one.
            </p>
          </div>

          {/* Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Messages */}
          {error && (
            <div style={{ fontSize: "0.68rem", color: "#f87171", marginBottom: "1rem", padding: "0.75rem 1rem", border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.05)" }}>
              {error === "already_exists" ? (
                <>Account already exists. Please <a href="/login" style={{ color: "#f87171", textDecoration: "underline" }}>sign in</a>.</>
              ) : error}
            </div>
          )}
          {message && (
            <div style={{ fontSize: "0.68rem", color: "#4ade80", marginBottom: "1rem", padding: "0.75rem 1rem", border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.05)" }}>
              {message}
              <div style={{ marginTop: "0.6rem" }}>
                <a href="/login" style={{ color: "#4ade80", textDecoration: "underline" }}>Sign in →</a>
              </div>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: "100%", padding: "1rem",
              background: loading ? "var(--gold-dim)" : "var(--gold)",
              color: "var(--bg)",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Creating account..." : "Create free account"}
          </button>

          {/* Footer note */}
          <p style={{ marginTop: "1.5rem", fontSize: "0.6rem", color: "var(--text-dim)", letterSpacing: "0.05em", lineHeight: 1.8, textAlign: "center" }}>
            By registering you accept our terms of service.<br />
            No spam. No credit card. Cancel anytime.
          </p>

        </div>
      </div>
    </>
  );
}