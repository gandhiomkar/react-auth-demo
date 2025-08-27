// pages/SignupForm.tsx
import { Input } from "@material-tailwind/react";
import { useState } from "react";
import FormContainer from "../components/FormContainer";
import {sleep} from "../utils/index"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {

  const {signupWithCredentials, user} = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<{ type: "info" | "error" | "success"; text: string } | null>(null);

  // Validation rules
  const validators: { [key: string]: (value: string) => string } = {
    name: (value) =>
      /^[A-Za-z\s]+$/.test(value) ? "" : "Name should contain only alphabets.",
    username: (value) =>
      /^[A-Za-z0-9@#\-_]+$/.test(value)
        ? ""
        : "Username can only contain letters, numbers, @, #, -, _.",
    phone: (value) =>
      /^\+\d{1,3}\d{7,14}$/.test(value)
        ? ""
        : "Phone must include country code (e.g., +1234567890).",
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email format.",
    password: (value) =>
      value === form.username
        ? "Password should not be the same as username."
        : "",
    confirmPassword: (value) =>
      value === form.password ? "" : "Passwords do not match.",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Live validation
    if (validators[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors: { [key: string]: string } = {};
    for (let key in form) {
      if (validators[key]) {
        const error = validators[key](form[key as keyof typeof form]);
        if (error) newErrors[key] = error;
      }
    }

    // Check if any errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage({ type: "error", text: "Please fix the highlighted errors." });
      return;
    }

    setMessage({ type: "info", text: "Creating account..." });
    console.log("Signup Form Data:", form);

    const result = signupWithCredentials(form.name, form.phone, form.username, form.email, form.password);
    
    if (result.success) {
      setMessage({type:'success', text: result.message});
      console.log("Signed up and logged in:", user);
      await sleep(500);
      navigate("/login")
    }


    setMessage({ type: "error", text: result.message });

    
  };

  return (
    <FormContainer
      title="Create Account"
      onSubmit={handleSubmit}
      buttonLabel="Sign Up"
      buttonColor="green"
      message={message}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div>
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
      </div>
    </FormContainer>
  );
}
