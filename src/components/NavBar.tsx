import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, User, List, LogIn, LogOut, LayoutDashboard, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { useWishlist } from "@/hooks/useWishlist";

interface NavBarProps {
  onCartClick?: () => void;
}

export default function NavBar({ onCartClick }: NavBarProps) {
  const supabaseUser = useSupabaseUser();
  const { wishlist } = useWishlist();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { cart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for JWT in local storage for traditional auth
    setIsLoggedIn(!!localStorage.getItem("jwt"));
    // Supabase user state
    import("@/integrations/supabase/client").then(({ supabase })=>{
        supabase.auth.getUser().then(({ data })=>{
            setUser(data?.user || null);
            setProfileName(data?.user?.user_metadata?.name || "");
        });
    });
  }, []);

  const handleLogout = async () => {
    import("@/integrations/supabase/client").then(async ({ supabase }) => {
      await supabase.auth.signOut();
      setUser(null);
      setUserDrawerOpen(false);
      window.location.href = "/";
    });
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    import("@/integrations/supabase/client").then(async ({ supabase }) => {
      // Update name if changed
      if (profileName) {
        const { error } = await supabase.auth.updateUser({ data: { name: profileName } });
        if (error) {
          setProfileError(error.message);
          return;
        } else {
          setProfileSuccess("Profile updated successfully");
        }
      }

      // Password change logic
      if (currentPassword || newPassword || confirmNewPassword) {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
          setProfileError("Please fill all password fields.");
          return;
        }
        if (newPassword !== confirmNewPassword) {
          setProfileError("New passwords do not match.");
          return;
        }
        // Get user email
        const { data: userData } = await supabase.auth.getUser();
        const email = userData?.user?.email;
        if (!email) {
          setProfileError("User email not found.");
          return;
        }
        // Try to sign in with current password
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: currentPassword });
        if (signInError) {
          setProfileError("Current password is wrong.");
          return;
        }
        // If correct, update password
        const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
        if (updateError) {
          setProfileError(updateError.message);
        } else {
          setProfileSuccess("Password changed successfully.");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        }
      }
    });
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center border-none outline-none cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              <span className="text-white font-bold text-lg">N</span>
            </button>
            <button
              className="font-bold text-xl bg-transparent border-none outline-none cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              FarmFresh
            </button>
          </div>
          <button
            className="hover:underline bg-transparent border-none outline-none cursor-pointer"
            onClick={() => {
              const el = document.getElementById('products-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Products
          </button>
          <button
            className="hover:underline bg-transparent border-none outline-none cursor-pointer"
            onClick={() => {
              const el = document.getElementById('about-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </button>
          <button
            className="hover:underline bg-transparent border-none outline-none cursor-pointer"
            onClick={() => {
              const el = document.getElementById('contact-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact
          </button>
          {/* User link removed as requested */}
          <Link to="/wishlist" className="hover:underline flex items-center gap-1 relative">
            <Heart className="h-4 w-4" /> Wishlist
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-leaf-green text-white rounded-full text-xs px-2 py-0.5">
                {wishlist.length}
              </span>
            )}
          </Link>
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
          {user ? (
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setUserDrawerOpen((v) => !v)}
                aria-label="User menu"
              >
                <User className="h-6 w-6" />
              </button>
              {userDrawerOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-50 p-4">
                  <Button className="w-full mb-2" onClick={() => setProfileModalOpen(true)}>
                    My Profile
                  </Button>
                  <Button className="w-full" variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
              {isProfileModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded shadow w-full max-w-sm relative">
                    <button className="absolute top-2 right-2" onClick={() => setProfileModalOpen(false)}>
                      <X className="h-5 w-5" />
                    </button>
                    <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                    <form onSubmit={handleProfileUpdate}>
                      <Input
                        placeholder="Name"
                        value={profileName}
                        onChange={e => setProfileName(e.target.value)}
                        className="mb-2"
                      />
                      <div className="mt-4 mb-2 font-semibold">Change Password</div>
                      <div className="relative mb-2">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Current Password"
                          value={currentPassword}
                          onChange={e => setCurrentPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-400"
                          onClick={() => setShowCurrentPassword(v => !v)}
                          tabIndex={-1}
                        >
                          {showCurrentPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <div className="relative mb-2">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="New Password"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-400"
                          onClick={() => setShowNewPassword(v => !v)}
                          tabIndex={-1}
                        >
                          {showNewPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <div className="relative mb-2">
                        <Input
                          type={showConfirmNewPassword ? "text" : "password"}
                          placeholder="Confirm New Password"
                          value={confirmNewPassword}
                          onChange={e => setConfirmNewPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-400"
                          onClick={() => setShowConfirmNewPassword(v => !v)}
                          tabIndex={-1}
                        >
                          {showConfirmNewPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      {profileError && <div className="text-red-500 mb-2">{profileError}</div>}
                      {profileSuccess && <div className="text-green-500 mb-2">{profileSuccess}</div>}
                      <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:underline flex items-center gap-1"><LogIn className="h-4 w-4" /> Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
