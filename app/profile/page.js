"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [telegramId, setTelegramId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push("/login");
        return;
      }
      setUser(session.user);

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setProfile(data);
        setTelegramId(data.telegram_chat_id || "");
      }
      setLoading(false);
    });
  }, [router]);

  async function handleSaveTelegram() {
    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("users")
      .upsert({ id: user.id, email: user.email, telegram_chat_id: telegramId })
      .eq("id", user.id);

    if (error) {
      setMessage({ type: "error", text: "Could not save. Please try again." });
    } else {
      setMessage({ type: "success", text: "Telegram ID updated successfully." });
      setProfile((p) => ({ ...p, telegram_chat_id: telegramId }));
    }
    setSaving(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const planLabels = {
    trial: "Free Trial",
    monthly: "Monthly",
    annual: "Annual",
    lifetime: "Lifetime — Founder",
  };

  const planColors = {
    trial: "var(--text-muted)",
    monthly: "var(--gold)",
    annual: "var(--gold)",
    lifetime: "var(--gold-light)",
  };

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
        input:disabled { opacity: 0.5; cursor: not-allowed; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade { animation: fadeUp 0.6s ease 0.1s both; }
        .section { padding: 2rem 0; border-top: 1px solid var(--border-dim); }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: "1.25rem 2rem", borderBottom: "1px solid var(--border-dim)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.12em", color: "var(--gold)", textTransform: "uppercase" }}>
          Steady Engine
        </a>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="/dashboard" style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>Dashboard</a>
          <button onClick={handleSignOut} style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>
            Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 2rem" }}>

        {/* Header */}
        <div className="fade" style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>Account</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.5rem", lineHeight: 1.1 }}>
            Your <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>profile</em>.
          </h1>
        </div>

        {/* Account info */}
        <div className="section">
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1.25rem" }}>Account details</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid var(--border-dim)" }}>
              <span style={{ fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Email</span>
              <span style={{ fontSize: "0.72rem", color: "var(--text)" }}>{user?.email}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid var(--border-dim)" }}>
              <span style={{ fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Plan</span>
              <span style={{ fontSize: "0.72rem", color: planColors[profile?.plan] || "var(--text)" }}>
                {planLabels[profile?.plan] || "Free Trial"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid var(--border-dim)" }}>
              <span style={{ fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Status</span>
              <span style={{ fontSize: "0.72rem", color: profile?.is_active ? "#4ade80" : "#f87171" }}>
                {profile?.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            {profile?.subscription_ends_at && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid var(--border-dim)" }}>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Renews</span>
                <span style={{ fontSize: "0.72rem", color: "var(--text)" }}>
                  {new Date(profile.subscription_ends_at).toLocaleDateString("en-GB")}
                </span>
              </div>
            )}
          </div>

          {profile?.plan !== "lifetime" && (
            <a href="/pricing" style={{ display: "inline-block", marginTop: "1.5rem", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", borderBottom: "1px solid var(--gold-dim)", paddingBottom: "2px" }}>
              Upgrade plan →
            </a>
          )}
        </div>

        {/* Telegram */}
        <div className="section">
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "0.75rem" }}>Telegram</div>
          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Your Telegram Chat ID is used to send you signals in real time. Find it by messaging <span style={{ color: "var(--text)" }}>@userinfobot</span> on Telegram.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "stretch" }}>
            <input
              type="text"
              placeholder="Your Telegram Chat ID"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value.replace(/\D/g, ""))}
            />
            <button
              onClick={handleSaveTelegram}
              disabled={saving}
              style={{
                padding: "0 1.5rem", background: saving ? "var(--gold-dim)" : "var(--gold)",
                color: "var(--bg)", border: "none", cursor: saving ? "not-allowed" : "pointer",
                fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.2em",
                textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
          {message && (
            <div style={{ marginTop: "0.75rem", fontSize: "0.68rem", color: message.type === "success" ? "#4ade80" : "#f87171", padding: "0.75rem 1rem", border: `1px solid ${message.type === "success" ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}`, background: message.type === "success" ? "rgba(74,222,128,0.05)" : "rgba(248,113,113,0.05)" }}>
              {message.text}
            </div>
          )}
        </div>

        {/* Danger zone */}
        <div className="section">
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "1.25rem" }}>Session</div>
          <button
            onClick={handleSignOut}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "0.8rem 1.5rem", background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border-dim)", cursor: "pointer" }}
          >
            Sign out
          </button>
        </div>

      </div>
    </>
  );
}