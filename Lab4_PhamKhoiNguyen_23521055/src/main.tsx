/* eslint-disable react-refresh/only-export-components */
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import PostDetail from "./pages/PostDetail";

function Root() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <Root />, // ✅ AuthProvider wraps EVERYTHING
    children: [
      { path: "/", element: <Login /> },

      {
        path: "/dashboard",
        element: <ProtectedRoute />, // ✅ protected gate
        children: [
          {
            element: <DashboardLayout />, // ✅ layout for dashboard pages
            children: [
              { index: true, element: <DashboardHome /> },
              { path: "post/:postId", element: <PostDetail /> },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
