import Link from "next/link";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
      }}
    >
      <aside style={{ padding: 16, borderRight: "1px solid #ddd" }}>
        <h3>Dashboard</h3>
        <nav style={{ display: "grid", gap: 8 }}>
          <Link href="/dashboard">Profile</Link>
        </nav>
      </aside>

      <main style={{ padding: 16 }}>{children}</main>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </div>
  );
}
