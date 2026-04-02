"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [telegramId, setTelegramId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
    });
  }, [router]);

  async function handleSaveTelegram() {
    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from("users")
      .upsert({ id: user.id, email: user.email, telegram_chat_id: telegramId })
      .eq("id", user.id);

    if (error) {
      setError("Could not save your Telegram ID. Please try again.");
      setLoading(false);
    } else {
      setStep(3);
      setLoading(false);
    }
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
          --bg3: #1A1A17;
          --text: #F0EDE4;
          --text-muted: #8A8778;
          --text-dim: #4A4840;
          --border-dim: rgba(255,255,255,0.06);
          --border-gold: rgba(201,168,76,0.15);
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
        .fade { animation: fadeUp 0.5s ease both; }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: "1.25rem 2rem", borderBottom: "1px solid var(--border-dim)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.12em", color: "var(--gold)", textTransform: "uppercase", textDecoration: "none" }}>
          Steady Engine
        </a>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ width: 24, height: 2, background: s <= step ? "var(--gold)" : "var(--border-dim)", transition: "background 0.3s" }} />
          ))}
        </div>
      </nav>

      <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div className="fade" style={{ width: "100%", maxWidth: 480 }}>

          {/* STEP 1 — Welcome */}
          {step === 1 && (
            <>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>
                Step 1 of 2
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.2rem", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Welcome to<br /><em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Steady Engine</em>.
              </h1>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "2rem" }}>
                Your account is ready. To receive trading signals in real time, you need to connect your Telegram account. It takes 2 minutes.
              </p>

              <div style={{ background: "var(--bg2)", border: "1px solid var(--border-dim)", padding: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>How it works</div>
                {[
                  ["01", "Open Telegram and search for @userinfobot"],
                  ["02", "Send any message to the bot"],
                  ["03", "Copy the number next to 'Id:'"],
                  ["04", "Paste it on the next step"],
                ].map(([num, text]) => (
                  <div key={num} style={{ display: "flex", gap: "1rem", padding: "0.6rem 0", borderBottom: "1px solid var(--border-dim)", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.6rem", color: "var(--gold-dim)", minWidth: 20 }}>{num}</span>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                style={{ width: "100%", padding: "1rem", background: "var(--gold)", color: "var(--bg)", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                I have my Chat ID →
              </button>

              <p style={{ marginTop: "1rem", textAlign: "center" }}>
                <a href="/dashboard" style={{ fontSize: "0.6rem", color: "var(--text-dim)", letterSpacing: "0.1em" }}>
                  Skip for now — set up later in profile
                </a>
              </p>
            </>
          )}

          {/* STEP 2 — Enter Telegram ID */}
          {step === 2 && (
            <>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>
                Step 2 of 2
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.2rem", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Enter your<br /><em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Telegram ID</em>.
              </h1>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "2rem" }}>
                This is the number you received from @userinfobot. It looks like <span style={{ color: "var(--text)" }}>123456789</span>.
              </p>

              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="text"
                  placeholder="Your Telegram Chat ID (e.g. 123456789)"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              {error && (
                <div style={{ fontSize: "0.68rem", color: "#f87171", marginBottom: "1rem", padding: "0.75rem 1rem", border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.05)" }}>
                  {error}
                </div>
              )}

              <button
                onClick={handleSaveTelegram}
                disabled={loading || !telegramId}
                style={{ width: "100%", padding: "1rem", background: loading || !telegramId ? "var(--gold-dim)" : "var(--gold)", color: "var(--bg)", border: "none", cursor: loading || !telegramId ? "not-allowed" : "pointer", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", transition: "background 0.2s" }}
              >
                {loading ? "Saving..." : "Save and continue →"}
              </button>

              <p style={{ marginTop: "1rem", textAlign: "center" }}>
                <button onClick={() => setStep(1)} style={{ fontSize: "0.6rem", color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}>
                  ← Back
                </button>
              </p>
            </>
          )}

          {/* STEP 3 — Done */}
          {step === 3 && (
            <>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", color: "var(--gold)", marginBottom: "1.5rem", lineHeight: 1 }}>✓</div>
                <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>
                  All set
                </div>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.2rem", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                  You're connected.<br /><em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Signals incoming</em>.
                </h1>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "2.5rem", maxWidth: 360, margin: "0 auto 2.5rem" }}>
                  Your Telegram is connected. You will receive signals automatically when the system identifies a valid setup.
                </p>
                <a href="/dashboard" style={{ display: "inline-block", padding: "1rem 2.5rem", background: "var(--gold)", color: "var(--bg)", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Go to dashboard →
                </a>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}