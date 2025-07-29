import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (!error) {
        navigate("/");
      } else {
        setError(error.message);
      }
    } catch {
      setError("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-2" />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4" />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <Button type="submit" className="w-full">Login</Button>
        <div className="mt-4 text-center">
          <a href="/signup" className="text-blue-600 hover:underline">Don't have an account? Sign up</a>
        </div>
      </form>
    </div>
  );
}
