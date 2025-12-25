import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function DashboardLayout() {
  const { logout } = useAuth();

  return (
    <div>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={logout}>Log out</button>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default DashboardLayout;
