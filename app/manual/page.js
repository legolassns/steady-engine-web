export default function Manual() {
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
        .section { padding: 2.5rem 0; border-top: 1px solid var(--border-dim); }
        .section-label {
          font-size: 0.58rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--gold-dim); margin-bottom: 1rem;
        }
        .section h2 {
          font-family: 'Cormorant Garamond', serif; font-weight: 400;
          font-size: 1.55rem; color: var(--text); margin-bottom: 1.25rem; line-height: 1.2;
        }
        p, li {
          font-size: 0.72rem; color: var(--text-muted); line-height: 2;
        }
        p + p { margin-top: 0.75rem; }
        ul, ol { padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
        li::marker { color: var(--gold-dim); }
        strong { color: var(--text); font-weight: 400; }
        .callout {
          background: var(--bg3); border-left: 2px solid var(--gold-dim);
          padding: 1.25rem 1.5rem; margin-top: 1.25rem;
        }
        .callout p { font-size: 0.7rem; }
        .signal-box {
          background: var(--bg2); border: 1px solid var(--border-dim);
          padding: 1.5rem; margin-top: 1.25rem; font-size: 0.72rem;
          line-height: 2.2; letter-spacing: 0.03em;
        }
        .signal-box .row { display: flex; gap: 1rem; justify-content: space-between; border-bottom: 1px solid var(--border-dim); padding: 0.35rem 0; }
        .signal-box .row:last-child { border-bottom: none; }
        .signal-box .key { color: var(--text-dim); text-transform: uppercase; font-size: 0.6rem; letter-spacing: 0.15em; }
        .signal-box .val { color: var(--text); }
        .signal-box .val.long { color: #4ade80; }
        .signal-box .val.short { color: #f87171; }
        .signal-box .val.gold { color: var(--gold); }
        .warning {
          background: rgba(248,113,113,0.05); border: 1px solid rgba(248,113,113,0.15);
          padding: 1.25rem 1.5rem; margin-top: 1.25rem;
        }
        .warning p { color: #f87171; font-size: 0.7rem; }
        .faq-item { padding: 1.25rem 0; border-bottom: 1px solid var(--border-dim); }
        .faq-item:last-child { border-bottom: none; }
        .faq-q {
          font-size: 0.72rem; color: var(--text); margin-bottom: 0.6rem; letter-spacing: 0.02em;
        }
        .faq-a { font-size: 0.7rem; color: var(--text-muted); line-height: 1.9; }
        a { color: var(--gold); text-decoration: none; border-bottom: 1px solid var(--gold-dim); padding-bottom: 1px; }
      `}</style>

      {/* NAV */}
      <nav style={{ padding: "1.25rem 2rem", borderBottom: "1px solid var(--border-dim)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.12em", color: "var(--gold)", textTransform: "uppercase", border: "none", padding: 0 }}>
          Steady Engine
        </a>
        <a href="/dashboard" style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", border: "none" }}>
          Dashboard
        </a>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "4rem 2rem 6rem" }}>

        {/* Hero */}
        <div className="fade" style={{ marginBottom: "3.5rem" }}>
          <div className="section-label">Documentation</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.8rem", lineHeight: 1.1 }}>
            The <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>manual</em>.
          </h1>
          <p style={{ marginTop: "1.25rem", maxWidth: 560 }}>
            Read this before you place your first trade. It will save you from the most common mistakes.
          </p>
        </div>

        {/* 1 — What is Steady Engine */}
        <div className="section">
          <div className="section-label">01</div>
          <h2>What is Steady Engine?</h2>
          <p>
            Steady Engine is a <strong>signal service for XAUUSD (Gold / US Dollar)</strong> on the spot forex market.
            Every morning, during the London session, the system analyses price action and — when the conditions are right — sends you a single, high-conviction trade idea directly on Telegram.
          </p>
          <p>
            It is <strong>not an automated trading robot</strong>. It does not touch your account. It does not open or close positions. It sends you information. You decide whether to act on it, and you execute the trade yourself.
          </p>
          <p>
            Think of it as a disciplined colleague who watches the chart every morning so you do not have to.
          </p>
          <div className="callout">
            <p>
              No signal is a guarantee. Markets can and do move against any analysis. Your capital is always at risk.
            </p>
          </div>
        </div>

        {/* 2 — How to read the signal */}
        <div className="section">
          <div className="section-label">02</div>
          <h2>How to read the Telegram signal</h2>
          <p>Every signal message contains the following fields:</p>

          <div className="signal-box">
            <div className="row"><span className="key">Instrument</span><span className="val">XAUUSD</span></div>
            <div className="row"><span className="key">Direction</span><span className="val long">LONG</span></div>
            <div className="row"><span className="key">Entry zone</span><span className="val">2 318.00 – 2 322.00</span></div>
            <div className="row"><span className="key">Stop loss</span><span className="val">2 308.50</span></div>
            <div className="row"><span className="key">Target</span><span className="val gold">2 340.00</span></div>
            <div className="row"><span className="key">Risk / Reward</span><span className="val">1 : 2.0</span></div>
            <div className="row"><span className="key">Session band</span><span className="val">London open</span></div>
            <div className="row"><span className="key">Risk hint</span><span className="val">1 % of account</span></div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: "1.5rem" }}>
            {[
              ["Direction", "LONG means you buy. SHORT means you sell."],
              ["Entry zone", "The price range in which you should look for an entry. Do not chase the trade if price has already moved well past this range."],
              ["Stop loss", "The level at which the trade idea is invalidated. Place your stop here, or tighter if your risk rules demand it — never wider."],
              ["Target", "The price level where the system expects meaningful resistance (for longs) or support (for shorts). This is where you consider taking profit."],
              ["Risk / Reward", "The ratio between the distance to the stop and the distance to the target, calculated from the midpoint of the entry zone."],
              ["Session band", "The market context in which the signal was generated. Most signals appear during the London open (02:00–05:00 UTC) or the early New York session."],
              ["Risk hint", "A suggested percentage of your account to risk on this trade. It is a hint, not an instruction. You own your risk decisions."],
            ].map(([term, desc]) => (
              <div key={term} style={{ display: "flex", gap: "1.5rem", padding: "0.9rem 0", borderBottom: "1px solid var(--border-dim)" }}>
                <span style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text)", minWidth: 110, paddingTop: "0.15rem" }}>{term}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.85 }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 — How to execute */}
        <div className="section">
          <div className="section-label">03</div>
          <h2>How to execute the trade</h2>
          <ol>
            <li>Open your broker platform and pull up the <strong>XAUUSD chart</strong>.</li>
            <li>Check that the current price is still within or near the <strong>entry zone</strong>. If price has moved more than 8–10 points past the zone, skip the trade.</li>
            <li>Calculate your <strong>position size</strong> based on the distance between your entry and the stop loss, keeping risk at 1–2% of your account (see section 04).</li>
            <li>Place a <strong>limit order</strong> at your chosen entry price within the zone, or enter at market if price is already inside the zone.</li>
            <li>Set your <strong>stop loss</strong> at the level shown in the signal.</li>
            <li>Set a <strong>take profit</strong> at the target level, or manage the position manually.</li>
            <li>Walk away. Do not watch the chart tick by tick.</li>
          </ol>
          <div className="callout">
            <p>
              Limit orders are strongly preferred over market orders. They give you a better price and force you to be deliberate about your entry.
            </p>
          </div>
        </div>

        {/* 4 — Risk management */}
        <div className="section">
          <div className="section-label">04</div>
          <h2>Personal risk management</h2>
          <p>
            This is the section that matters most. Signal quality means nothing if your position sizing is wrong.
          </p>
          <p>
            The rule is simple: <strong>risk no more than 1–2% of your total account balance on any single trade</strong>.
          </p>
          <p>
            To calculate position size, use this formula:
          </p>
          <div className="signal-box" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", lineHeight: 2, letterSpacing: "0.01em" }}>
            <div style={{ color: "var(--text-muted)", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Position size formula</div>
            <div style={{ color: "var(--text)" }}>
              Risk amount = Account balance × Risk %<br />
              Pip value per lot = (varies by broker — check your platform)<br />
              <span style={{ color: "var(--gold)" }}>Lots = Risk amount ÷ (Stop distance in pips × Pip value)</span>
            </div>
          </div>
          <p style={{ marginTop: "1.25rem" }}>
            Example: $10,000 account, 1% risk = $100 at risk. Stop distance = 13.5 points. If 1 lot of XAUUSD has a pip value of $1 per 0.01 lot per point, work backwards from $100 to find your lot size. Use a position size calculator if unsure.
          </p>
          <div className="callout">
            <p>
              A losing streak of five trades at 1% risk per trade costs you 5% of your account. At 5% per trade, the same streak costs you 23% after compounding. Sizing matters more than win rate.
            </p>
          </div>
        </div>

        {/* 5 — What NOT to do */}
        <div className="section">
          <div className="section-label">05</div>
          <h2>What not to do</h2>
          <div className="warning">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", marginBottom: "0.75rem", color: "#f87171" }}>
              These behaviours will reliably destroy your account.
            </p>
          </div>
          <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              ["Do not overtrade", "Steady Engine issues at most one signal per session. If you feel the urge to add trades beyond the signal, you are speculating — not following a system."],
              ["Do not move your stop loss wider", "If the stop is hit, the trade idea was wrong. Accept it. Moving the stop is how small losses become large ones."],
              ["Do not add to a losing position", "Averaging down on a losing XAUUSD trade compounds your exposure into a deteriorating thesis."],
              ["Do not trade every signal blindly", "If the news calendar shows a high-impact event (NFP, FOMC, CPI) during the session, consider skipping or reducing size. The signal does not account for scheduled macro events."],
              ["Do not risk money you cannot afford to lose", "This is a rule, not a disclaimer. If a losing month would cause you financial hardship, your position sizes are too large — or you should not be trading yet."],
              ["Do not expect consistency without patience", "Even a high-quality signal service will have losing weeks. The edge plays out over dozens of trades, not one or two."],
            ].map(([title, desc]) => (
              <div key={title} style={{ padding: "1rem 0", borderBottom: "1px solid var(--border-dim)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#f87171" }}>{title}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.85 }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 — Operating hours */}
        <div className="section">
          <div className="section-label">06</div>
          <h2>Operating hours</h2>
          <p>
            The system is active during the <strong>London session</strong> and the early part of the <strong>New York session</strong>. These are the hours with the highest XAUUSD liquidity and the clearest institutional order flow.
          </p>

          <div className="signal-box" style={{ marginTop: "1.25rem" }}>
            <div className="row">
              <span className="key">UTC</span>
              <span className="val">00:00 – 11:15</span>
            </div>
            <div className="row">
              <span className="key">Italy (CET / CEST)</span>
              <span className="val">02:00 – 13:15</span>
            </div>
            <div className="row">
              <span className="key">Days active</span>
              <span className="val">Monday – Friday</span>
            </div>
            <div className="row">
              <span className="key">Weekends</span>
              <span className="val" style={{ color: "var(--text-dim)" }}>No signals</span>
            </div>
          </div>

          <p style={{ marginTop: "1.25rem" }}>
            Signals are typically issued between <strong>02:00 and 06:00 UTC</strong> (04:00–08:00 IT), coinciding with the London open. Occasionally a second signal may appear at the New York open. If no signal has arrived by 09:00 UTC, it is unlikely one will come that day.
          </p>
          <div className="callout">
            <p>
              Italy observes CET (UTC+1) in winter and CEST (UTC+2) in summer. The times shown above use CEST (summer). During winter, add one hour to Italian times: London open signals arrive around 03:00–07:00 IT.
            </p>
          </div>
        </div>

        {/* 7 — FAQ */}
        <div className="section">
          <div className="section-label">07</div>
          <h2>Frequently asked questions</h2>

          <div style={{ marginTop: "0.5rem" }}>
            {[
              {
                q: "I received a signal but the price already moved past the entry zone. What do I do?",
                a: "Skip the trade. Chasing an entry outside the zone changes the risk/reward profile the signal was built around. There will be another signal.",
              },
              {
                q: "The stop loss was hit. Did I do something wrong?",
                a: "No. Stop losses are part of the system, not a failure. A signal that gets stopped out is a trade that worked exactly as planned — you lost a controlled, pre-defined amount and protected the rest of your account.",
              },
              {
                q: "Can I use Steady Engine with a prop firm account?",
                a: "Yes, but check your prop firm's rules carefully. Most require stop losses on every trade (the signal always includes one). Be aware of daily drawdown limits and scale your sizing down accordingly during the evaluation phase.",
              },
              {
                q: "How do I find my Telegram Chat ID?",
                a: "Open Telegram and start a conversation with @userinfobot. It will reply with your numeric Chat ID. Paste that number into your profile settings on this site.",
              },
              {
                q: "How many signals per week should I expect?",
                a: "Typically 2–4 signals per week. The system only fires when the setup meets its criteria — it is designed to be selective, not prolific. Weeks with no signals are normal and preferable to forcing low-quality trades.",
              },
              {
                q: "Does the signal change or get cancelled after it is sent?",
                a: "No. Once a signal is sent it stands as issued. The system does not send follow-up modifications. If market conditions deteriorate rapidly before you enter, use your own judgement to stay out.",
              },
              {
                q: "What broker should I use?",
                a: "Any regulated broker offering XAUUSD spot with tight spreads will work. Look for spreads below 0.30 on gold during London hours. The system is not affiliated with any broker.",
              },
              {
                q: "Is this financial advice?",
                a: "No. Steady Engine provides information and analysis only. Nothing sent via Telegram or displayed on this site constitutes personalised financial advice. You are solely responsible for your own trading decisions.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="faq-item">
                <div className="faq-q">{q}</div>
                <div className="faq-a">{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border-dim)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontSize: "0.62rem", color: "var(--text-dim)", letterSpacing: "0.1em" }}>
            Steady Engine — signal service for XAUUSD
          </span>
          <a href="/dashboard" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", border: "none" }}>
            Go to dashboard →
          </a>
        </div>

      </div>
    </>
  );
}
