"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
export default function Performance() {
const [sessions, setSessions] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
supabase
.from("daily_sessions")
.select("*")
.order("date", { ascending: true })
.then(({ data, error }) => {
if (!error && data) setSessions(data);
setLoading(false);
});
}, []);
const cumulativeR = sessions.reduce((acc, s, i) => {
const prev = i === 0 ? 0 : acc[i - 1];
acc.push(Math.round((prev + s.daily_realized_r) * 100) / 100);
    return acc;
  }, []);
const totalR = cumulativeR[cumulativeR.length - 1] ?? 0;
const totalTrades = sessions.reduce((a, s) => a + s.trades_taken, 0);
const activeDays = sessions.filter(s => s.trades_taken > 0).length;
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
        }        body { background: var(--bg); color: var(--text); font-family: 'DM Mono', monospace; }
        .perf-wrap { max-width: 900px; margin: 0 auto; padding: 60px 24px; }        .perf-title { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300; color: var(--gold-light); margin-bottom: 8px; }
.perf-subtitle { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 48px; }
.stats-row { display: flex; gap: 16px; margin-bottom: 48px; flex-wrap: wrap; }
.stat-box { background: var(--bg2); border: 1px solid var(--border-gold); border-radius: 8px; padding: 20px 28px; flex: 1; min-width: 140px; }
.stat-label { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; }
.stat-value { font-size: 1.6rem; font-weight: 300; color: var(--gold-light); }
.section-title { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px; }
.chart-wrap { background: var(--bg2); border: 1px solid var(--border-dim); border-radius: 8px; padding: 24px; margin-bottom: 48px; height: 180px; display: flex; align-items: flex-end; gap: 4px; }
.bar { flex: 1; border-radius: 3px 3px 0 0; min-width: 6px; transition: opacity 0.2s; }
.bar:hover { opacity: 0.8; }
table { width: 100%; border-collapse: collapse; }
th { font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); padding: 10px 12px; text-align: left; border-bottom: 1px solid var(--border-dim); }
td { font-size: 0.75rem; padding: 12px 12px; border-bottom: 1px solid var(--border-dim); color: var(--text); }
tr:last-child td { border-bottom: none; }
.positive { color: #6fcf97; }
.negative { color: #eb5757; }
.neutral { color: var(--text-muted); }
.disclaimer { margin-top: 48px; padding: 20px; background: var(--bg2); border: 1px solid var(--border-dim); border-radius: 8px; font-size: 0.65rem; line-height: 1.7; color: var(--text-muted); }
a.back { display: inline-block; margin-bottom: 32px; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); text-decoration: none; }
a.back:hover { color: var(--gold); }
`}</style>
<div style={{ minHeight: "100vh", background: "var(--bg)" }}>
<div className="perf-wrap">
<a className="back" href="/dashboard">← Dashboard</a>
<div className="perf-title">Performance</div>
<div className="perf-subtitle">Daily session history — XAUUSD</div>
<div className="stats-row">
<div className="stat-box">
<div className="stat-label">Cumulative R</div>
<div className={`stat-value ${totalR >= 0 ? "positive" : "negative"}`}>{totalR > 0 ? "+" : ""}{totalR}R</div>
</div>
<div className="stat-box">
<div className="stat-label">Total Trades</div>
<div className="stat-value">{totalTrades}</div>
</div>
<div className="stat-box">
<div className="stat-label">Active Days</div>
<div className="stat-value">{activeDays}</div>
</div>
            <div className="stat-box">              <div className="stat-label">Sessions</div>
<div className="stat-value">{sessions.length}</div>
</div>
</div>
<div className="section-title">Equity Curve (Cumulative R)</div>
<div className="chart-wrap">
{sessions.map((s, i) => {
const maxAbs = Math.max(...cumulativeR.map(Math.abs), 1);
const val = cumulativeR[i];
const height = Math.max(4, Math.abs(val) / maxAbs * 140);
const color = val >= 0 ? "#6fcf97" : "#eb5757";
return (
<div key={s.date} title={`${s.date}: ${val}R`} className="bar"
style={{ height: `${height}px`, background: color, opacity: s.trades_taken === 0 ? 0.3 : 1 }} />
);
            })}          </div>
<div className="section-title">Session Details</div>
<table>
<thead>
<tr>
<th>Date</th>
<th>Trade</th>
<th>Daily R</th>
<th>Cumulative R</th>
</tr>
</thead>
<tbody>
{[...sessions].reverse().map((s, i) => {
const cumIdx = sessions.length - 1 - i;
const cumR = cumulativeR[cumIdx];
return (
<tr key={s.date}>
<td>{s.date}</td>
<td>{s.trades_taken}</td>
<td className={s.daily_realized_r > 0 ? "positive" : s.daily_realized_r < 0 ? "negative" : "neutral"}>
{s.daily_realized_r > 0 ? "+" : ""}{s.daily_realized_r}R
</td>
<td className={cumR > 0 ? "positive" : cumR < 0 ? "negative" : "neutral"}>
{cumR > 0 ? "+" : ""}{cumR}R
</td>
                  </tr>                );
})}
</tbody>
</table>
<div className="disclaimer">
Past performance is not indicative of future results. Data shown refers to a demo account. Trading financial instruments involves significant risk of capital loss.
</div>
</div>
</div>
</>
);
}
