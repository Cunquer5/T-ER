import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";

export default function Wishlist() {
  const handleBack = () => {
    window.location.href = "/";
  };
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [wishlistAlert, setWishlistAlert] = useState("");
  const total = wishlist.reduce((sum, p) => sum + (p.price || 0), 0);
  return (
    <div className="container mx-auto p-8">
      {wishlistAlert && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow-lg z-50 transition-all">
          {wishlistAlert}
        </div>
      )}
      <button
        className="mb-6 px-4 py-2 bg-leaf-green text-white rounded hover:bg-leaf-green/80 transition-colors"
        onClick={handleBack}
      >
        ← Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
      <div className="mb-6 text-lg font-semibold text-right">Total: ₹{total}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            image={product.image}
            price={product.price}
            category={product.category}
            onAddToCart={() => {}}
            onAddToWishlist={() => {
              addToWishlist(product);
              setWishlistAlert(`${product.name} added to wishlist!`);
              setTimeout(() => setWishlistAlert("") , 3000);
            }}
            onRemoveFromWishlist={() => removeFromWishlist(product.id)}
            isWishlisted={true}
          />
        ))}
      </div>
      {wishlist.length === 0 && <div className="text-center py-12">No wishlisted products.</div>}
    </div>
  );
}
