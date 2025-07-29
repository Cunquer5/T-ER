import { useState, useEffect } from "react";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
const categories = [
  { id: "all", name: "All Products" },
  { id: "vegetables", name: "Vegetables" },
  { id: "fruits", name: "Fruits" },
  { id: "grains", name: "Grains" },
  { id: "dairy", name: "Dairy" },
  { id: "eco", name: "Eco Friendly Products" },
  { id: "warli", name: "Handmade Warli Painted" },
];
const sampleProducts = [
  // Fruits
  { id: "f1", name: "Guava", price: 100, image: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Sweet and nutritious guava, rich in vitamins and fiber.", isOrganic: false, inStock: true },
  { id: "f2", name: "Papaya", price: 40, image: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Sweet and nutritious papaya, rich in vitamins.", isOrganic: false, inStock: true },
  { id: "f3", name: "Chikoo", price: 60, image: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Sweet and creamy chikoo, perfect for desserts.", isOrganic: false, inStock: true },
  { id: "f4", name: "Lemon", price: 100, image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Fresh lemons, perfect for cooking and beverages.", isOrganic: false, inStock: true },
  
  // Vegetables
  { id: "v1", name: "Mushroom", price: 467, image: "https://images.unsplash.com/photo-1590326048384-2a6a8b79b97a?auto=format&fit=crop&w=400&q=80", category: "vegetables", description: "Fresh mushrooms, perfect for cooking and salads.", isOrganic: false, inStock: true },
  { id: "v2", name: "Curry Leaves", price: 80, image: "https://images.unsplash.com/photo-1587334237935-66bdee359345?auto=format&fit=crop&w=400&q=80", category: "vegetables", description: "Fresh curry leaves bundle, essential for Indian cooking.", isOrganic: false, inStock: true },
  { id: "v3", name: "Moringa Leaves", price: 80, image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=400&q=80", category: "vegetables", description: "Nutritious moringa leaves bundle, rich in vitamins.", isOrganic: false, inStock: true },
  { id: "v4", name: "Pumpkin", price: 20, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80", category: "vegetables", description: "Fresh pumpkin, perfect for curries and soups.", isOrganic: false, inStock: true },
  { id: "v5", name: "Lemon Grass", price: 80, image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80", category: "vegetables", description: "Fresh lemon grass bundle, aromatic and flavorful.", isOrganic: false, inStock: true },
  
  // Grains
  { id: "g1", name: "Rice Indrayani", price: 100, image: "https://images.unsplash.com/photo-1534952219639-c19053940aa3?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Premium Indrayani rice, perfect for daily cooking.", isOrganic: false, inStock: true },
  { id: "g2", name: "Rice Indrayani Cut1", price: 40, image: "https://images.unsplash.com/photo-1534952219639-c19053940aa3?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Cut Indrayani rice, quick cooking variety.", isOrganic: false, inStock: true },
  { id: "g3", name: "Rice Indrayani Crushed", price: 40, image: "https://images.unsplash.com/photo-1534952219639-c19053940aa3?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Crushed Indrayani rice, ideal for rice dishes.", isOrganic: false, inStock: true },
  { id: "g4", name: "Rice Shakti Full", price: 100, image: "https://images.unsplash.com/photo-1534952219639-c19053940aa3?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Full grain Shakti rice, nutritious and filling.", isOrganic: false, inStock: true },
  { id: "g5", name: "Rice Shakti Cut", price: 60, image: "https://images.unsplash.com/photo-1534952219639-c19053940aa3?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Cut Shakti rice, faster cooking option.", isOrganic: false, inStock: true },
  { id: "g6", name: "Rice Shakti Crushed", price: 40, image: "https://images.unsplash.com/photo-1534952219639-c19053940aa3?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Crushed Shakti rice, perfect for rice preparations.", isOrganic: false, inStock: true },
  { id: "g7", name: "Mustard", price: 400, image: "https://images.unsplash.com/photo-1534952219639-c19053940aa3?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Pure mustard seeds, essential for pickling and cooking.", isOrganic: false, inStock: true },
  { id: "g8", name: "Nagali", price: 120, image: "https://images.unsplash.com/photo-1534952219639-c19053940aa3?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Traditional Nagali grain, nutritious and healthy.", isOrganic: false, inStock: true },
  
  // Dairy
  { id: "d1", name: "Gir A2 Cow Milk", price: 110, image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=400&q=80", category: "dairy", description: "Fresh Gir A2 Cow Milk, delivered daily. Rich in A2 protein and nutrients, perfect for families seeking natural, healthy milk. Price per litre.", isOrganic: false, inStock: true, unit: "litre" },
  { id: "d2", name: "Ghee", price: 3000, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80", category: "dairy", description: "Pure, clarified butter made from fresh cream. Traditional and aromatic ghee perfect for cooking and religious ceremonies.", isOrganic: true, inStock: true, unit: "kg" },
  { id: "d3", name: "Chaas", price: 40, image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=400&q=80", category: "dairy", description: "Fresh buttermilk, cooling and nutritious.", isOrganic: false, inStock: true, unit: "litre" },
  { id: "d4", name: "Honey", price: 1000, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80", category: "dairy", description: "Pure natural honey, sweet and healthy.", isOrganic: true, inStock: true, unit: "litre" },
  
  // Eco Friendly Products
  { id: "eco1", name: "Dhupbatti Chandan", price: 120, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", category: "eco", description: "Sandalwood incense sticks, aromatic and spiritual.", isOrganic: true, inStock: true, unit: "pack of 30" },
  { id: "eco2", name: "Dhupbatti Lobhan", price: 120, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", category: "eco", description: "Lobhan incense sticks, purifying and traditional.", isOrganic: true, inStock: true, unit: "pack of 30" },
  { id: "eco3", name: "Dhupbatti Havan", price: 100, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", category: "eco", description: "Havan incense sticks, for spiritual ceremonies.", isOrganic: true, inStock: true, unit: "pack of 30" },
  { id: "eco4", name: "Dhupbatti Mosquito Repellent", price: 100, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", category: "eco", description: "Natural mosquito repellent incense sticks.", isOrganic: true, inStock: true, unit: "pack of 30" },
  { id: "eco5", name: "Cow Dung Powder", price: 50, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", category: "eco", description: "Pure, sun-dried cow dung powder, perfect for organic farming and gardening.", isOrganic: true, inStock: true, unit: "kg" },
  { id: "eco6", name: "Cow Dung Cake", price: 50, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", category: "eco", description: "Traditional cow dung cakes, eco-friendly fuel and fertilizer.", isOrganic: true, inStock: true, unit: "pack of 10" },
  
  // Handmade Warli Painted
  { id: "warli1", name: "Penstand", price: 150, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80", category: "warli", description: "Beautiful handcrafted Warli painted penstand, traditional tribal art design.", isOrganic: false, inStock: true, unit: "piece" }
];
// Clean implementation
export const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [wishlistAlert, setWishlistAlert] = useState("");
  const [cartAlert, setCartAlert] = useState("");
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
		<div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
		  <div className="relative flex-1 flex items-center">
			<span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
			  <Search className="h-5 w-5 text-primary-dark" />
			</span>
			<Input
			  placeholder="Search products..."
			  value={searchTerm}
			  onChange={(e) => setSearchTerm(e.target.value)}
			  className="pl-12 border-2 border-primary-dark bg-gradient-to-r from-primary-dark/10 to-primary/20 text-primary-dark focus:border-primary-dark focus:ring-primary/50 shadow-sm"
			/>
		  </div>
		  <div className="flex items-center gap-2 min-w-[220px]">
			<label htmlFor="category-sort" className="font-medium text-primary-dark whitespace-nowrap">Sort:</label>
			<Select value={selectedCategory} onValueChange={setSelectedCategory}>
			  <SelectTrigger className="min-w-[180px] border-2 border-primary-dark bg-gradient-to-r from-primary-dark to-primary text-white font-semibold shadow-md focus:ring-primary/50">
				<SelectValue placeholder="Select category" />
			  </SelectTrigger>
			  <SelectContent>
				{categories.map((category) => (
				  <SelectItem key={category.id} value={category.id}>
					{category.name}
				  </SelectItem>
				))}
			  </SelectContent>
			</Select>
		  </div>
		</div>
		{/* Products Grid */}
		{loading && products.length === 0 ? (
		  <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
			<Loader2 className="h-10 w-10 text-primary-dark animate-spin mb-4" />
			<span className="text-lg text-primary-dark">Loading products...</span>
		  </div>
		) : error ? (
		  <div className="text-center py-12 text-red-500">{error}</div>
		) : (
		  <>
			{wishlistAlert && (
			  <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow-lg z-50 transition-all">
				{wishlistAlert}
			  </div>
			)}
			{cartAlert && (
			  <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded shadow-lg z-50 transition-all">
				{cartAlert}
			  </div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
			  {filteredProducts.map((product) => (
				<div className="transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl rounded-xl">
				  <ProductCard
					key={product.id}
					{...product}
					onAddToCart={() => {
					  addToCart(product);
					  setCartAlert(`${product.name} added to cart!`);
					  setTimeout(() => setCartAlert("") , 3000);
					}}
					onAddToWishlist={() => {
					  addToWishlist(product);
					  setWishlistAlert(`${product.name} added to wishlist!`);
					  setTimeout(() => setWishlistAlert("") , 3000);
					}}
					onRemoveFromWishlist={() => removeFromWishlist(product.id)}
					isWishlisted={wishlist.some((item) => item.id === product.id)}
				  />
				</div>
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
