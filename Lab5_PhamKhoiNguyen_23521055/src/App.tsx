import { useState, Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Modal } from "./components/Modal";
import { LoadingSpinner } from "./components/LoadingSpinner";

// ✅ code-split the rarely used page
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => {
        console.log("PARENT DIV CLICKED (React synthetic bubble)");
      }}
      style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}
    >
      <h2>Portal Modal Demo</h2>

      <nav style={{ marginBottom: 12 }}>
        <Link to="/admin">Go to Admin Panel</Link>
      </nav>

      <div
        style={{
          width: 360,
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <p>
          This card has <code>overflow: hidden</code>.
        </p>

        <button onClick={() => setOpen(true)}>Open Modal</button>

        <Modal open={open} onClose={() => setOpen(false)} title="Trapdoor Modal">
          <p>
            This modal is rendered in <code>#modal-root</code>, so it is NOT clipped.
          </p>

          <button
            onClick={() => {
              console.log("BUTTON INSIDE PORTAL CLICKED");
            }}
          >
            Click me (bubbles to parent)
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/admin"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPanel />
          </Suspense>
        }
      />
    </Routes>
  );
}
