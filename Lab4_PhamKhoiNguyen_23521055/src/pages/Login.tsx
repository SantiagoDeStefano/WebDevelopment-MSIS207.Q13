import { useEffect, useRef } from "react";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const { login } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  return (
    <div>
      <h1>Login</h1>

      <input ref={usernameRef} type="text" placeholder="Username" />

      <button onClick={login}>Log In</button>
    </div>
  );
}

export default Login;
