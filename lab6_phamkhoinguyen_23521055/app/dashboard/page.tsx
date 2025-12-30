import { SettingsToggle } from "../dashboard/settings-toggle";

async function getUserProfile() {
  // simulate server-side delay
  await new Promise((r) => setTimeout(r, 1200));
  return { name: "Pham Khoi Nguyen", role: "Admin", lastLogin: "2025-12-30" };
}

export default async function DashboardPage() {
  const profile = await getUserProfile();

  return (
    <div>
      <h2>User Profile</h2>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Role:</b> {profile.role}</p>
      <p><b>Last login:</b> {profile.lastLogin}</p>

      <hr style={{ margin: "16px 0" }} />

      {/* Client component embedded in server component */}
      <SettingsToggle />
    </div>
  );
}
