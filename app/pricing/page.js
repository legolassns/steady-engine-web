"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Pricing() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });
  }, []);

  async function handleCheckout(plan) {
    if (!user) {
      window.location.href = "/register";
      return;
    }

    setLoading(plan);
    setCheckoutError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ plan, userId: user.id, email: user.email }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error || "Something went wrong. Please try again.");
        setLoading(null);
      }
    } catch (err) {
      setCheckoutError("Could not connect to checkout. Please try again.");
      setLoading(null);
    }
  }

  const plans = [
    {
      key: "trial",
      name: "Trial",
      price: "€0",
      period: "/30 days",
      note: "No credit card required",
      featured: false,
      features: ["Real signals on live market", "Dashboard access", "Full manual"],
      cta: "Start free",
      action: () => window.location.href = user ? "/dashboard" : "/register",
    },
    {
      key: "monthly",
      name: "Monthly",
      price: "€49",
      period: "/month",
      note: "Cancel anytime",
      featured: false,
      features: ["Real-time Telegram signals", "Dashboard + signal history", "Session band & risk hint"],
      cta: "Subscribe",
      action: () => handleCheckout("monthly"),
    },
    {
      key: "annual",
      name: "Annual",
      price: "€397",
      period: "/year",
      note: "Equivalent to ~8 months — save 33%",
      featured: false,
      features: ["Everything in Monthly", "Member badge in dashboard", "Priority access to new features"],
      cta: "Save 33%",
      action: () => handleCheckout("annual"),
    },
    {
      key: "lifetime",
      name: "Lifetime",
      price: "€497",
      period: " one-time",
      note: "Founder offer — first 100 users only",
      featured: true,
      features: ["Permanent access forever", "Founder badge in dashboard", "Early access to every feature", "Priority support"],
      cta: "Become a Founder",
      action: () => handleCheckout("lifetime"),
    },
  ];

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
        }
        body { background: var(--bg); color: var(--text); font-family: 'DM Mono', monospace; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade { animation: fadeUp 0.6s ease 0.1s both; }
        .plan-cta:hover { opacity: 0.85; }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: "1.25rem 2rem", borderBottom: "1px solid var(--border-dim)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.12em", color: "var(--gold)", textTransform: "uppercase" }}>
          Steady Engine
        </a>
        <a href={user ? "/dashboard" : "/login"} style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {user ? "Dashboard →" : "Sign in →"}
        </a>
      </nav>

      {/* HEADER */}
      <div className="fade" style={{ textAlign: "center", padding: "5rem 2rem 3rem" }}>
        <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>
          Plans & Pricing
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
          <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Clear</em> pricing.<br />No surprises.
        </h1>
        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", maxWidth: 420, margin: "0 auto", lineHeight: 1.9 }}>
          Start free for 30 days. No credit card required. Upgrade anytime.
        </p>
      </div>

      {/* PLANS */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 6rem" }}>
        {checkoutError && (
          <div style={{ fontSize: "0.68rem", color: "#f87171", marginBottom: "1.5rem", padding: "0.75rem 1rem", border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.05)" }}>
            {checkoutError}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1, background: "var(--border-dim)" }}>
          {plans.map((plan) => (
            <div key={plan.key} style={{
              background: plan.featured ? "var(--bg3)" : "var(--bg)",
              padding: "2.5rem 2rem",
              borderTop: plan.featured ? "2px solid var(--gold)" : "2px solid transparent",
              position: "relative",
            }}>
              {plan.featured && (
                <div style={{
                  position: "absolute", top: 0, right: "1.5rem", transform: "translateY(-50%)",
                  background: "var(--gold)", color: "var(--bg)",
                  fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "0.3rem 0.8rem",
                }}>
                  Limited · 100 users
                </div>
              )}
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1.25rem" }}>{plan.name}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 300, lineHeight: 1, marginBottom: "0.5rem", color: "var(--text)" }}>
                {plan.price}<span style={{ fontFamily: "'DM Mono'", fontSize: "0.85rem", fontWeight: 300, color: "var(--text-muted)" }}>{plan.period}</span>
              </div>
              <div style={{ fontSize: "0.6rem", color: "var(--text-dim)", marginBottom: "2rem" }}>{plan.note}</div>
              <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ fontSize: "0.66rem", color: "var(--text-muted)", padding: "0.5rem 0", borderBottom: "1px solid var(--border-dim)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "var(--gold-dim)" }}>—</span>{f}
                  </li>
                ))}
              </ul>
              <button
                className="plan-cta"
                onClick={plan.action}
                disabled={loading === plan.key}
                style={{
                  display: "block", width: "100%",
                  fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "0.9rem", textAlign: "center",
                  background: plan.featured ? "var(--gold)" : "transparent",
                  color: plan.featured ? "var(--bg)" : "var(--gold)",
                  border: "1px solid var(--gold-dim)",
                  cursor: loading === plan.key ? "not-allowed" : "pointer",
                  opacity: loading === plan.key ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {loading === plan.key ? "Redirecting..." : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: "3rem", padding: "1.5rem", borderTop: "1px solid var(--border-dim)", textAlign: "center", fontSize: "0.58rem", color: "var(--text-dim)", letterSpacing: "0.04em", lineHeight: 1.9 }}>
          Steady Engine provides informational trading signals and does not constitute financial advice. Trading involves significant risk of capital loss. Past performance does not guarantee future results.
        </div>
      </div>
    </>
  );
}