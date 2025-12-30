export function LoadingSpinner() {
  return (
    <div
      style={{
        minHeight: "40vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
      }}
      aria-busy="true"
      aria-live="polite"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            display: "inline-block",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <span>Loading…</span>
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
