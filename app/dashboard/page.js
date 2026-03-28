"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0A0A08", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A8778" }}>Loading...</span>
    </div>
  );

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
          --bg3: #1A1A17;
          --text: #F0EDE4;
          --text-muted: #8A8778;
          --text-dim: #4A4840;
          --border-dim: rgba(255,255,255,0.06);
          --border-gold: rgba(201,168,76,0.15);
        }
        body { background: var(--bg); color: var(--text); font-family: 'DM Mono', monospace; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade { animation: fadeUp 0.6s ease 0.1s both; }
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: "1.25rem 2rem", borderBottom: "1px solid var(--border-dim)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.12em", color: "var(--gold)", textTransform: "uppercase" }}>
          Steady Engine
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--text-dim)" }}>{user?.email}</span>
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}
            style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem" }}>

        {/* Header */}
        <div className="fade" style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>
            Dashboard
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.5rem", lineHeight: 1.1 }}>
            Good morning,<br /><em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>welcome back</em>.
          </h1>
        </div>

        {/* Status cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, background: "var(--border-dim)", marginBottom: "3rem" }}>
          {[
            ["System", "ACTIVE", true],
            ["Bias", "SHORT", false],
            ["Trades today", "0 / 3", false],
            ["Band", "STABLE", false],
          ].map(([label, value, dot]) => (
            <div key={label} style={{ background: "var(--bg)", padding: "1.75rem" }}>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {dot && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />}
                {label}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--text)", lineHeight: 1 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Today's signals */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1.5rem" }}>
            Today's signals
          </div>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border-dim)", padding: "3rem 2rem", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "var(--text-muted)", marginBottom: "0.75rem" }}>
              No signals yet today.
            </div>
            <p style={{ fontSize: "0.68rem", color: "var(--text-dim)", lineHeight: 1.9, maxWidth: 400, margin: "0 auto" }}>
              The system operates between 02:00 and 12:15 UTC. Signals appear here and on Telegram when market conditions are favourable.
            </p>
          </div>
        </div>

        {/* Telegram setup banner */}
        <div style={{ background: "var(--bg3)", border: "1px solid var(--border-gold)", padding: "1.75rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
              Connect Telegram
            </div>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
              Add your Telegram Chat ID to receive signals in real time.
            </p>
          </div>
          <a href="/onboarding" style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "0.8rem 1.5rem", background: "var(--gold)", color: "var(--bg)",
          }}>
            Set up →
          </a>
        </div>

      </div>
    </>
  );
}