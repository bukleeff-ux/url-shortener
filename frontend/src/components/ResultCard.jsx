import { useState } from "react";

export default function ResultCard({ data }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(data.short_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={styles.card}>
      <div style={styles.row}>
        <span style={styles.shortUrl}>{data.short_url}</span>
        <button style={{ ...styles.copyBtn, background: copied ? "var(--success)" : "var(--accent)" }} onClick={copy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div style={styles.meta}>
        <span style={styles.metaItem}>
          <b style={styles.metaValue}>{data.clicks}</b> clicks
        </span>
        <span style={styles.dot}>·</span>
        <span style={styles.metaItem}>
          Created {new Date(data.created_at).toLocaleDateString()}
        </span>
      </div>

      <p style={styles.original}>
        <span style={styles.muted}>→ </span>
        <a href={data.original_url} target="_blank" rel="noreferrer">{data.original_url}</a>
      </p>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  row: { display: "flex", alignItems: "center", gap: 10 },
  shortUrl: { fontSize: 16, fontWeight: 600, color: "var(--accent-hover)", flex: 1, wordBreak: "break-all" },
  copyBtn: {
    border: "none",
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 600,
    color: "#fff",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background .2s",
  },
  meta: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" },
  metaItem: {},
  metaValue: { color: "var(--text)" },
  dot: { opacity: 0.4 },
  original: { fontSize: 13, color: "var(--muted)", wordBreak: "break-all" },
  muted: { opacity: 0.5 },
};
