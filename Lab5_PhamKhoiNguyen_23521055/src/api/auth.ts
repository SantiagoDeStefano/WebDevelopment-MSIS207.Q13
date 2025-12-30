export type LoginResponse = {
  user: { email: string };
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return (await res.json()) as LoginResponse;
}
