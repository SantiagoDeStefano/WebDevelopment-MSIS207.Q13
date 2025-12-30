import React, { useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

function getModalRoot(): HTMLElement {
  const el = document.getElementById("modal-root");
  if (!el) {
    // Fallback: still works if you forgot modal-root (but you shouldn't)
    return document.body;
  }
  return el;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div
      // overlay
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Modal"}
      onClick={onClose} // click backdrop closes
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        // modal box
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        style={{
          width: "min(560px, 92vw)",
          background: "white",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <strong>{title ?? "Modal"}</strong>
          <button onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div style={{ marginTop: 12 }}>{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, getModalRoot());
}
