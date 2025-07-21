import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/v1/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch {
      setError("Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="mb-2" />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-2" />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4" />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <Button type="submit" className="w-full">Sign Up</Button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-600 hover:underline">Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
}
