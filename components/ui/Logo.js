export default function Logo() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 1,
          fontFamily: "var(--font-display)",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "-0.6px",
        }}
      >
        <span style={{ color: "var(--text-primary)" }}>Code</span>
        <span style={{ position: "relative", color: "var(--text-primary)" }}>
          Snap
          <span
            style={{
              position: "absolute",
              top: -9,
              right: 2,
              width: 7,
              height: 7,
              borderRadius: 999,
              background: "var(--accent)",
            }}
          />
        </span>
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          marginTop: 6,
        }}
      >
        Make your code worth sharing
      </div>
    </div>
  );
}
