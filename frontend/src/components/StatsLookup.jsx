import { useState } from "react";
import ResultCard from "./ResultCard";

const API = import.meta.env.VITE_API_URL ?? "";

export default function StatsLookup() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookup(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(`${API}/stats/${code.trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "Not found");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <form onSubmit={lookup} style={styles.row}>
        <input
          style={styles.input}
          placeholder="Enter short code (e.g. abc123)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
          {loading ? "…" : "Check"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {result && <ResultCard data={result} />}
    </div>
  );
}

const styles = {
  wrap: { display: "flex", flexDirection: "column", gap: 12 },
  row: { display: "flex", gap: 8 },
  input: {
    flex: 1,
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "var(--text)",
    fontSize: 14,
    outline: "none",
  },
  btn: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "10px 18px",
    color: "var(--text)",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  error: { fontSize: 13, color: "var(--error)" },
};
