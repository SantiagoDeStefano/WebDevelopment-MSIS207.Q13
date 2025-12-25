import { useRef } from "react";

function UncontrolledLogin() {
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usernameRef.current) return;

    alert(usernameRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={usernameRef} />
      <button type="submit">Login</button>
    </form>
  );
}

export default UncontrolledLogin;
