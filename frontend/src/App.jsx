import { useState } from "react";
import ShortenForm from "./components/ShortenForm";
import ResultCard from "./components/ResultCard";
import StatsLookup from "./components/StatsLookup";

export default function App() {
  const [tab, setTab] = useState("shorten"); // "shorten" | "stats"
  const [results, setResults] = useState([]);

  function addResult(data) {
    setResults((prev) => [data, ...prev]);
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🔗 Shortly</h1>
        <p style={styles.subtitle}>Shorten, share and track your links</p>
      </div>

      {/* Card */}
      <div style={styles.card}>
        {/* Tabs */}
        <div style={styles.tabs}>
          {["shorten", "stats"].map((t) => (
            <button
              key={t}
              style={{ ...styles.tab, ...(tab === t ? styles.tabActive : {}) }}
              onClick={() => setTab(t)}
            >
              {t === "shorten" ? "Shorten" : "Stats"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={styles.body}>
          {tab === "shorten" ? (
            <>
              <ShortenForm onResult={addResult} />
              {results.length > 0 && (
                <div style={styles.results}>
                  <p style={styles.resultsLabel}>Your links</p>
                  {results.map((r) => (
                    <ResultCard key={r.short_code} data={r} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <StatsLookup />
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", gap: 24 },
  header: { textAlign: "center" },
  title: { fontSize: 32, fontWeight: 700, letterSpacing: "-0.5px" },
  subtitle: { fontSize: 15, color: "var(--muted)", marginTop: 6 },
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  },
  tabs: { display: "flex", borderBottom: "1px solid var(--border)" },
  tab: {
    flex: 1,
    padding: "12px 0",
    background: "transparent",
    border: "none",
    color: "var(--muted)",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "color .15s",
    textTransform: "capitalize",
  },
  tabActive: { color: "var(--text)", borderBottom: "2px solid var(--accent)" },
  body: { padding: 24, display: "flex", flexDirection: "column", gap: 20 },
  results: { display: "flex", flexDirection: "column", gap: 10 },
  resultsLabel: { fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" },
};
