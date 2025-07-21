import React from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  if (!open) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("jwt");
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }));
      const res = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ items, shippingAddress })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Order placed successfully!");
        clearCart();
      } else {
        setMessage(data.message || "Order failed");
      }
    } catch (err) {
      setMessage("Order failed");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Left-side semi-transparent overlay */}
      <div
        className="absolute left-0 top-0 h-full w-[calc(100%-20rem)] bg-black/30 transition-opacity duration-200"
        onClick={onClose}
        aria-label="Close cart drawer"
      />
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-lg p-6 flex flex-col animate-slide-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <span>Your cart is empty. Add some products!</span>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
              <input
                type="text"
                className="border rounded px-3 py-2 mt-2"
                placeholder="Shipping Address"
                value={shippingAddress}
                onChange={e => setShippingAddress(e.target.value)}
                disabled={loading}
              />
              <div className="flex gap-2 mt-2">
                <Button variant="outline" onClick={clearCart} disabled={loading}>Clear Cart</Button>
                <Button variant="organic" onClick={handleCheckout} disabled={loading || !shippingAddress}>
                  {loading ? "Placing Order..." : "Checkout"}
                </Button>
              </div>
              {message && (
                <div className="mt-2 text-center text-sm text-primary font-semibold">{message}</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
