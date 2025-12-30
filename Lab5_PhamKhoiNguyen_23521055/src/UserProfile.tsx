import { useEffect, useReducer } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type State =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "resolved"; data: User; error: null }
  | { status: "rejected"; data: null; error: string };

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: User }
  | { type: "FETCH_FAILURE"; payload: string };

const initialState: State = { status: "idle", data: null, error: null };

// FSM-style reducer: only allow valid transitions.
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_INIT": {
      // Only allow init when idle/rejected/resolved. If already loading, keep it loading.
      if (state.status === "loading") return state;
      return { status: "loading", data: null, error: null };
    }

    case "FETCH_SUCCESS": {
      // Guard: success only valid from loading.
      if (state.status !== "loading") return state; // or throw new Error("Invalid transition");
      return { status: "resolved", data: action.payload, error: null };
    }

    case "FETCH_FAILURE": {
      // Guard: failure only valid from loading.
      if (state.status !== "loading") return state; // or throw new Error("Invalid transition");
      return { status: "rejected", data: null, error: action.payload };
    }

    default: {
      // Exhaustiveness check
      return state;
    }
  }
}

async function fetchUser(userId: number, signal: AbortSignal): Promise<User> {
  // Swap this with your real API endpoint
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    { signal }
  );
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data = (await res.json()) as any;
  return { id: data.id, name: data.name, email: data.email };
}

export function UserProfile({ userId }: { userId: number }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();

    dispatch({ type: "FETCH_INIT" });

    fetchUser(userId, controller.signal)
      .then((user) => dispatch({ type: "FETCH_SUCCESS", payload: user }))
      .catch((err: unknown) => {
        // Ignore abort errors
        if (err instanceof DOMException && err.name === "AbortError") return;
        const message = err instanceof Error ? err.message : "Unknown error";
        dispatch({ type: "FETCH_FAILURE", payload: message });
      });

    return () => controller.abort();
  }, [userId]);

  if (state.status === "idle") {
    return <div>Pick a user.</div>;
  }

  if (state.status === "loading") {
    return <div>Loading user...</div>;
  }

  if (state.status === "rejected") {
    return (
      <div>
        <p style={{ color: "crimson" }}>Error: {state.error}</p>
        <button onClick={() => dispatch({ type: "FETCH_INIT" })}>Retry</button>
      </div>
    );
  }

  // resolved
  return (
    <div>
      <h2>{state.data.name}</h2>
      <p>{state.data.email}</p>
    </div>
  );
}
