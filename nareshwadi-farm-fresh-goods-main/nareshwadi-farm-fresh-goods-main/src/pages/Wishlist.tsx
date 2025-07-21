import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";

export default function Wishlist() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    fetch(`/api/v1/products?ids=${wishlist.join(",")}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      {products.length === 0 && <div className="text-center py-12">No wishlisted products.</div>}
    </div>
  );
}
