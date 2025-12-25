import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

function ControlledSignup() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default ControlledSignup;
