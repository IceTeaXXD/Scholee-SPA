import { useState } from "react";
import "tailwindcss/tailwind.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle login logic here
  };

  return (
    <div>
      hello from login
    </div>
  );
}

export default Login;