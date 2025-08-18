import { useState, useEffect } from "react";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
const categories = [
  { id: "all", name: "All Products" },
  { id: "vegetables", name: "Vegetables" },
  { id: "fruits", name: "Fruits" },
  { id: "grains", name: "Grains" },
  { id: "dairy", name: "Dairy" },
];
const sampleProducts = [
  // Fruits
  { id: "f1", name: "Mangoes", price: 120, image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Juicy, sweet mangoes from Maharashtra.", isOrganic: false, inStock: true },
  { id: "f2", name: "Apples", price: 180, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b69665?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Crisp apples, perfect for snacking.", isOrganic: false, inStock: true },
  { id: "f3", name: "Bananas", price: 50, image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Fresh bananas from local farms.", isOrganic: false, inStock: true },
  { id: "f4", name: "Lychee", price: 250, image: "https://images.unsplash.com/photo-1627382219423-5494d187e34c?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Seasonal lychee, sweet and juicy.", isOrganic: false, inStock: true, isSeasonal: true },
  { id: "f5", name: "Jamun", price: 300, image: "https://images.unsplash.com/photo-1627382219423-5494d187e34c?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Seasonal jamun, tangy and nutritious.", isOrganic: false, inStock: true, isSeasonal: true },
  { id: "f6", name: "Kiwi", price: 220, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Fresh kiwi, rich in vitamin C.", isOrganic: false, inStock: true },
  // Vegetables
  { id: "v1", name: "Potato", price: 30, image: "https://images.unsplash.com/photo-1590326048384-2a6a8b79b97a?auto=format&fit=crop&w=400&q=80", category: "vegetables", description: "Fresh potatoes from Nashik.", isOrganic: false, inStock: true },
  { id: "v2", name: "Onion", price: 35, image: "https://images.unsplash.com/photo-1587334237935-66bdee359345?auto=format&fit=crop&w=400&q=80", category: "vegetables", description: "Red onions, staple for Indian cooking.", isOrganic: false, inStock: true },
  { id: "v3", name: "Tomato", price: 40, image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=400&q=80", category: "vegetables", description: "Juicy tomatoes, perfect for salads.", isOrganic: false, inStock: true },
  // Dairy
  { id: "d1", name: "Cheese", price: 500, image: "https://images.unsplash.com/photo-1628013825792-780126b384f5?auto=format&fit=crop&w=400&q=80", category: "dairy", description: "Fresh cheese, locally made.", isOrganic: false, inStock: true },
  { id: "d2", name: "Paneer", price: 320, image: "https://plus.unsplash.com/premium_photo-1668618482869-63cf106358a9?auto=format&fit=crop&w=400&q=80", category: "dairy", description: "Soft paneer, perfect for curries.", isOrganic: false, inStock: true },
  { id: "d3", name: "Milk", price: 60, image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=400&q=80", category: "dairy", description: "Fresh milk, delivered daily.", isOrganic: false, inStock: true, unit: "litre" },
  // Grains
  { id: "g1", name: "Wheat", price: 35, image: "https://images.unsplash.com/photo-1534952219639-c19053940aa3?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Whole wheat, ground fresh.", isOrganic: false, inStock: true },
  { id: "g2", name: "Indrayani Rice", price: 120, image: "https://images.unsplash.com/photo-1586201375822-52c67340e4f4?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Indrayani rice, aromatic and soft.", isOrganic: false, inStock: true },
  { id: "g3", name: "Basmati Rice", price: 180, image: "https://images.unsplash.com/photo-1586201375822-52c67340e4f4?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Premium basmati rice, long grain.", isOrganic: false, inStock: true },
];
// Clean implementation
export const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [wishlistAlert, setWishlistAlert] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const user = useSupabaseUser();
  const userEmail = user?.email;

  useEffect(() => {
	setLoading(true);
	setProducts(sampleProducts);
	setLoading(false);
  }, []);

  const filteredProducts = products.filter((product) => {
	const matchesCategory =
	  selectedCategory === "all" ||
	  product.category?.name === selectedCategory ||
	  product.category === selectedCategory;
	const matchesSearch =
	  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
	  product.description.toLowerCase().includes(searchTerm.toLowerCase());
	return matchesCategory && matchesSearch;
  });

  return (
	<section className="py-16 bg-background" id="products-section">
	  <div className="container mx-auto px-4">
		<div className="text-center mb-12">
		  <h2 className="text-4xl font-bold mb-4">
			<span className="font-script text-leaf-green">Fresh</span> Products
		  </h2>
		  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
			Discover our wide selection of organic, farm-fresh produce delivered
			straight to your door
		  </p>
		</div>
		{/* Search and Filter */}
		<div className="flex flex-col md:flex-row gap-4 mb-8">
		  <div className="relative flex-1">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
			<Input
			  placeholder="Search products..."
			  value={searchTerm}
			  onChange={(e) => setSearchTerm(e.target.value)}
			  className="pl-10"
			/>
		  </div>
		  <div className="flex gap-2 flex-wrap">
			{categories.map((category) => (
			  <Button
				key={category.id}
				variant={selectedCategory === category.id ? "default" : "outline"}
				size="sm"
				onClick={() => setSelectedCategory(category.id)}
				className="flex items-center gap-2"
			  >
				<Filter className="h-4 w-4" />
				{category.name}
			  </Button>
			))}
		  </div>
		</div>
		{/* Products Grid */}
		{loading && products.length === 0 ? (
		  <div className="text-center py-12">Loading products...</div>
		) : error ? (
		  <div className="text-center py-12 text-red-500">{error}</div>
		) : (
		  <>
			{wishlistAlert && (
			  <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow-lg z-50 transition-all">
				{wishlistAlert}
			  </div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			  {filteredProducts.map((product) => (
				<ProductCard
				  key={product.id}
				  {...product}
				  onAddToCart={() => addToCart(product)}
				  onAddToWishlist={() => {
					addToWishlist(product);
					setWishlistAlert(`${product.name} added to wishlist!`);
					setTimeout(() => setWishlistAlert("") , 3000);
				  }}
				  onRemoveFromWishlist={() => removeFromWishlist(product.id)}
				  isWishlisted={wishlist.some((item) => item.id === product.id)}
				/>
			  ))}
			</div>
			{filteredProducts.length === 0 && (
			  <div className="text-center py-12">
				<p className="text-muted-foreground text-lg">
				  No products found matching your criteria.
				</p>
			  </div>
			)}
		  </>
		)}
	  </div>
	</section>
  );
}
