// pages/LoginForm.tsx
import { Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/authContext"

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "info" | "error" | "success"; text: string } | null>(null);
  const navigate = useNavigate()
  const {loginWithCredentials} = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage({ type: "error", text: "Please fill in both fields." });
      return;
    }

    setMessage({ type: "info", text: "Attempting to sign in..." });
    console.log("Login:", { username, password });
    const result = loginWithCredentials(username, password);
    if(result.success){
      setMessage({type: 'success', text:result.message});
      // setMessage({type: "success", text: "Signed in!"});
      navigate('/')
    }
    else{

      setMessage({type: "error", text: "Signed in Failed!"});
    }
  };

  return (
    <FormContainer
      title="Login"
      onSubmit={handleLogin}
      buttonLabel="Sign In"
      buttonColor="blue"
      message={message}
      footer={
        <Typography variant="small" className="text-center">
          Not signed in?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up now.
          </Link>
        </Typography>
      }
    >
      <Input
        label="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </FormContainer>
  );
}
