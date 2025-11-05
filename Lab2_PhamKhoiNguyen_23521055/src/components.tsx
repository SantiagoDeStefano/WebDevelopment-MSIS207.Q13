/** @jsx createElement */
import { createElement } from "./jsx-runtime";

// ---------- Card ----------
export interface CardProps {
  title?: string;
  children?: any;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  headerRight?: any; // e.g., actions on the right side of header
}

export const Card = ({ title, children, className, onClick, headerRight }: CardProps) => (
  <div
    className={className ?? "card"}
    onClick={onClick as any}
    style={{
      background: "#fff",
      border: "1px solid #e5e5e5",
      borderRadius: "10px",
      padding: "16px",
      boxShadow: "0 2px 6px rgba(0,0,0,.06)",
    }}
  >
    {(title || headerRight) && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        {title && <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>}
        {headerRight}
      </div>
    )}
    <div>{children}</div>
  </div>
);

// ---------- Modal ----------
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: any;
  className?: string;
  closeOnOverlay?: boolean; // default true
}

export const Modal = ({ isOpen, onClose, title, children, className, closeOnOverlay = true }: ModalProps) => {
  if (!isOpen) return null as any;

  const stop = (e: Event) => e.stopPropagation();

  return (
    <div
      className="modal-overlay"
      onClick={closeOnOverlay ? onClose as any : undefined}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 1000,
      }}
    >
      <div
        className={className ?? "modal"}
        onClick={stop as any}
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "min(520px, 96vw)",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid #eee" }}>
          <strong>{title ?? "Modal"}</strong>
          <button onClick={onClose as any} style={{ border: "none", background: "transparent", fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  );
};

// ---------- Form ----------
export interface FormProps {
  onSubmit: (data: FormData, event: Event) => void;
  children?: any;
  className?: string;
}

export const Form = ({ onSubmit, children, className }: FormProps) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    onSubmit(new FormData(form), e);
  };

  return (
    <form className={className ?? "form"} onSubmit={handleSubmit as any}>
      {children}
    </form>
  );
};

// ---------- Input ----------
export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  className?: string;
  // Keep it uncontrolled by default. You can still listen:
  onInput?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

export const Input = ({ name, type = "text", placeholder, defaultValue, className, onInput, onChange }: InputProps) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    defaultValue={defaultValue as any}
    className={className}
    onInput={onInput as any}
    onChange={onChange as any}
    style={{
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #ccc",
      borderRadius: 6,
      outline: "none",
    }}
  />
);
