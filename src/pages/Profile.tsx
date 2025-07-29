import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return navigate("/login");
    fetch("/api/v1/customers/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setError("Failed to load profile"));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <Input value={user.name} readOnly />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <Input value={user.email} readOnly />
      </div>
      <Button variant="outline" onClick={handleLogout}>Logout</Button>
    </div>
  );
}
