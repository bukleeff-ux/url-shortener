import { useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "";

export default function ShortenForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, custom_code: customCode || undefined }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "Something went wrong");
      onResult(data);
      setUrl("");
      setCustomCode("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>Long URL</label>
        <input
          style={styles.input}
          type="url"
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Custom code <span style={styles.optional}>(optional)</span></label>
        <input
          style={styles.input}
          type="text"
          placeholder="my-link"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          maxLength={16}
          pattern="[A-Za-z0-9_-]+"
          title="Letters, digits, hyphens and underscores only"
        />
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <button style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
        {loading ? "Shortening…" : "Shorten URL"}
      </button>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, color: "var(--muted)", fontWeight: 500 },
  optional: { fontWeight: 400, opacity: 0.6 },
  input: {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "var(--text)",
    fontSize: 15,
    outline: "none",
    transition: "border-color .15s",
  },
  btn: {
    background: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 0",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .15s",
    marginTop: 4,
  },
  error: { color: "var(--error)", fontSize: 13 },
};
