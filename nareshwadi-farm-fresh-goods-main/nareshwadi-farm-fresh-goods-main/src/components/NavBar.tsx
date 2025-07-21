import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, User, Home, List, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface NavBarProps {
  onCartClick?: () => void;
}

export default function NavBar({ onCartClick }: NavBarProps) {
  const { cart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwt"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl flex items-center gap-2 text-leaf-green">
            <Home className="h-5 w-5" /> Farm Fresh
          </Link>
          <Link to="/" className="hover:underline">Products</Link>
          <Link to="/wishlist" className="hover:underline flex items-center gap-1"><Heart className="h-4 w-4" /> Wishlist</Link>
          <Link to="/orders" className="hover:underline flex items-center gap-1"><List className="h-4 w-4" /> Orders</Link>
          <button type="button" onClick={onCartClick} className="hover:underline flex items-center gap-1 relative bg-transparent border-none outline-none cursor-pointer">
            <ShoppingCart className="h-4 w-4" />
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-leaf-green text-white rounded-full text-xs px-2 py-0.5">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:underline flex items-center gap-1"><User className="h-4 w-4" /> Profile</Link>
              <Link to="/dashboard" className="hover:underline flex items-center gap-1"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
              <button onClick={handleLogout} className="hover:underline flex items-center gap-1 text-red-600"><LogOut className="h-4 w-4" /> Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:underline flex items-center gap-1"><LogIn className="h-4 w-4" /> Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
