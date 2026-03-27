"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
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
          --border: rgba(201,168,76,0.15);
          --border-dim: rgba(255,255,255,0.06);
        }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg) !important;
          color: var(--text);
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          line-height: 1.7;
          overflow-x: hidden;
        }
        a { color: inherit; text-decoration: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }
        .a1 { animation: fadeUp 0.7s ease 0.1s both; }
        .a2 { animation: fadeUp 0.7s ease 0.25s both; }
        .a3 { animation: fadeUp 0.7s ease 0.4s both; }
        .a4 { animation: fadeUp 0.7s ease 0.55s both; }
        .nav-link { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); transition: color 0.2s; }
        .nav-link:hover { color: var(--gold-light); }
        .btn-gold { background: var(--gold); color: var(--bg); transition: background 0.2s; }
        .btn-gold:hover { background: var(--gold-light); }
        .plan-cta { display: block; width: 100%; margin-top: 2rem; font-family: 'DM Mono', monospace; font-size: 0.63rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.9rem; text-align: center; cursor: pointer; transition: all 0.2s; }
        .plan-cta:hover { background: var(--gold) !important; color: var(--bg) !important; border-color: var(--gold) !important; }
        .metric-card { background: var(--bg); padding: 2rem 1.75rem; border-top: 2px solid transparent; transition: border-color 0.3s; }
        .metric-card:hover { border-top-color: var(--gold-dim); }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.25rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid var(--border-dim)",
        background: scrolled ? "rgba(10,10,8,0.97)" : "rgba(10,10,8,0.75)",
        backdropFilter: "blur(12px)",
        transition: "background 0.3s",
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.12em", color: "var(--gold)", textTransform: "uppercase" }}>
          Steady Engine
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[["#how", "How it works"], ["#performance", "Performance"], ["#pricing", "Pricing"]].map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>
        <a href="#pricing" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.55rem 1.4rem", border: "1px solid var(--gold-dim)", color: "var(--gold-light)" }}>
          Start free
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 2rem 6rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)", maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)", pointerEvents: "none" }} />

        <div className="a1" style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ width: 40, height: 1, background: "var(--gold-dim)", display: "inline-block" }} />
          XAUUSD · Trend Following · Discipline
          <span style={{ width: 40, height: 1, background: "var(--gold-dim)", display: "inline-block" }} />
        </div>

        <h1 className="a2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05, marginBottom: "1.8rem", maxWidth: 800 }}>
          Disciplined signals<br />on <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>gold</em>.<br />No promises.
        </h1>

        <p className="a3" style={{ fontSize: "0.78rem", letterSpacing: "0.06em", color: "var(--text-muted)", maxWidth: 480, margin: "0 auto 3rem", lineHeight: 1.9 }}>
          A decision engine that filters market noise, identifies favorable conditions, and signals only setups that meet strict technical criteria.
        </p>

        <div className="a4" style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#pricing" className="btn-gold" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "1rem 2.5rem" }}>
            30 days free
          </a>
          <a href="#how" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "1rem 2rem", border: "1px solid var(--border-dim)", color: "var(--text-muted)" }}>
            How it works →
          </a>
        </div>
        <p style={{ marginTop: "1.5rem", fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--text-dim)", textTransform: "uppercase" }}>
          No credit card required · Cancel anytime
        </p>
      </section>

      {/* STATUS BAR */}
      <div style={{ padding: "1rem 2rem", borderTop: "1px solid var(--border-dim)", borderBottom: "1px solid var(--border-dim)", background: "var(--bg2)", display: "flex", gap: "2.5rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
        {[["System","ACTIVE",true],["Instrument","XAUUSD",false],["Bias","SHORT",false],["Window","02:00 — 12:15 UTC",false],["Trades today","0 / 3",false],["Band","STABLE",false]].map(([label, value, dot]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.63rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />}
            <span style={{ color: "var(--text-muted)" }}>{label}</span>
            <span style={{ color: "var(--text)", fontWeight: 400 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "7rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>01 — Process</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          A system that <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>filters</em>,<br />not one that forces.
        </h2>
        <p style={{ fontSize: "0.73rem", color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.9, marginBottom: "4rem" }}>
          Days without signals are not a problem — they are the system working correctly, recognising unfavourable conditions and staying still.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: "var(--border-dim)" }}>
          {[
            ["01","1H Structural Bias","Directional bias is determined on the 1H timeframe: trend, structure, position relative to moving averages. No counter-trend trades."],
            ["02","Neutrality Filter","The system checks RSI, market range, compression, and abnormal volatility. If the market is neutral, no signal is sent. Ever."],
            ["03","5m Entry Trigger","The entry trigger is a micro-structure break on the 5m chart aligned with the bias. Only valid if there is sufficient room to the target."],
            ["04","Calculated Risk","Mandatory technical stop loss. Minimum RR 1.5. Maximum 3 trades per day. Automatic kill switch after consecutive losses."],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ background: "var(--bg)", padding: "2.5rem 2rem" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 300, color: "var(--gold-dim)", lineHeight: 1, marginBottom: "1.5rem" }}>{num}</div>
              <h3 style={{ fontSize: "0.68rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", color: "var(--text)" }}>{title}</h3>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.8 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNAL PREVIEW */}
      <section style={{ padding: "0 2rem 7rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>02 — Signal</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, marginBottom: "3rem" }}>
          What you receive on <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Telegram</em>.
        </h2>
        <div style={{ display: "flex", gap: "4rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", padding: "2rem", maxWidth: 360, fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", lineHeight: 1.6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border-dim)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", flexShrink: 0, display: "inline-block" }} />
              <div>
                <div style={{ fontSize: "0.73rem", fontWeight: 400, letterSpacing: "0.1em" }}>STEADY ENGINE — LONG</div>
                <div style={{ color: "var(--gold)", fontSize: "0.63rem" }}>XAUUSD+</div>
              </div>
            </div>
            {[["Entry","3 245.50","var(--text)"],["Stop Loss","3 238.00","var(--text)"],["Target","3 260.00","var(--gold-light)"],["RR","1 : 2.1","var(--gold-light)"],["Session","ACTIVE","var(--text)"],["Band","STRONG","#4ade80"],["Risk hint","Normal size ✓","#4ade80"]].map(([k,v,c]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.63rem", letterSpacing: "0.1em" }}>{k}</span>
                <span style={{ color: c, fontSize: "0.68rem" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-dim)", fontSize: "0.58rem", color: "var(--text-dim)" }}>
              Do not chase the market more than 5 pips from entry.
            </div>
          </div>
          <div style={{ maxWidth: 380 }}>
            {[["I.","Exact direction and price","Entry, stop, and target as absolute prices. Works with any broker offering XAUUSD."],["II.","Band = session quality","ELITE / STRONG → normal size. FRAGILE / CRITICAL → reduce or skip. Full transparency on every signal."],["III.","Stop loss is fixed","Calculated on real technical structure. Do not move it after opening the trade."]].map(([num,title,desc]) => (
              <div key={num} style={{ padding: "2rem 0", borderTop: "1px solid var(--border-dim)" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--gold-dim)", marginBottom: "0.75rem" }}>{num}</div>
                <h3 style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem", color: "var(--text)" }}>{title}</h3>
                <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.9 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section id="performance" style={{ padding: "0 2rem 7rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>03 — Data</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, marginBottom: "4rem" }}>
          <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Transparent</em> performance.<br />Drawdown included.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1, background: "var(--border-dim)" }}>
          {[["1.5×","Minimum RR","Every trade requires RR ≥ 1.5 by rule"],["3","Max trades/day","Hard limit, not discretionary"],["02:00","Session open UTC","Operational close at 12:30"],["−2R","Daily kill switch","Auto-stop beyond −2R per day"]].map(([num,label,desc]) => (
            <div key={label} className="metric-card">
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 300, color: "var(--gold-light)", lineHeight: 1, marginBottom: "0.5rem" }}>{num}</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</div>
              <div style={{ fontSize: "0.62rem", color: "var(--text-dim)", marginTop: "0.5rem" }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "0 2rem 7rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: "1rem" }}>04 — Plans</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, marginBottom: "4rem" }}>
          <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Clear</em> pricing.<br />No surprises.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1, background: "var(--border-dim)" }}>
          {[
            { name:"Trial", price:"€0", period:"/30 days", note:"No credit card required", featured:false, features:["Real signals on live market","Dashboard access","Full manual"], cta:"Start free" },
            { name:"Monthly", price:"€49", period:"/month", note:"Cancel anytime", featured:false, features:["Real-time Telegram signals","Dashboard + signal history","Session band & risk hint"], cta:"Subscribe" },
            { name:"Annual", price:"€397", period:"/year", note:"Equivalent to ~8 months — save 33%", featured:false, features:["Everything in Monthly","Member badge in dashboard","Priority access to new features"], cta:"Save 33%" },
            { name:"Lifetime", price:"€497", period:" one-time", note:"Founder offer — first 100 users only", featured:true, features:["Permanent access forever","Founder badge in dashboard","Early access to every feature","Priority support"], cta:"Become a Founder" },
          ].map((plan) => (
            <div key={plan.name} style={{ background: plan.featured ? "var(--bg3)" : "var(--bg)", padding: "2.5rem 2rem", borderTop: plan.featured ? "2px solid var(--gold)" : "2px solid transparent", position: "relative" }}>
              {plan.featured && (
                <div style={{ position: "absolute", top: 0, right: "1.5rem", transform: "translateY(-50%)", background: "var(--gold)", color: "var(--bg)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "0.3rem 0.8rem" }}>
                  Limited · 100 users
                </div>
              )}
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1.25rem" }}>{plan.name}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 300, lineHeight: 1, marginBottom: "0.5rem", color: "var(--text)" }}>
                {plan.price}<span style={{ fontFamily: "'DM Mono'", fontSize: "0.85rem", fontWeight: 300, color: "var(--text-muted)" }}>{plan.period}</span>
              </div>
              <div style={{ fontSize: "0.6rem", color: "var(--text-dim)", marginBottom: "2rem" }}>{plan.note}</div>
              <ul style={{ listStyle: "none" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ fontSize: "0.66rem", color: "var(--text-muted)", padding: "0.5rem 0", borderBottom: "1px solid var(--border-dim)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "var(--gold-dim)" }}>—</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#" className="plan-cta" style={{ background: plan.featured ? "var(--gold)" : "transparent", color: plan.featured ? "var(--bg)" : "var(--gold)", border: "1px solid var(--gold-dim)" }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <div style={{ padding: "0 2rem 4rem" }}>
        <div style={{ borderTop: "1px solid var(--border-dim)", background: "var(--bg2)", padding: "2rem", textAlign: "center", fontSize: "0.58rem", color: "var(--text-dim)", letterSpacing: "0.04em", lineHeight: 1.9, maxWidth: 700, margin: "0 auto" }}>
          Steady Engine provides informational trading signals and does not constitute financial advice or investment recommendations. Trading financial instruments involves significant risk of capital loss. Past performance does not guarantee future results. The user is solely responsible for their own trading decisions.
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border-dim)", padding: "2.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-dim)" }}>Steady Engine</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[["#how","How it works"],["#performance","Performance"],["#pricing","Pricing"]].map(([href,label]) => (
            <a key={href} href={href} style={{ fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)" }}>{label}</a>
          ))}
        </div>
      </footer>
    </>
  );
}