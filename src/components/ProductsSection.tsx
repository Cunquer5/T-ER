import { useState, useEffect } from "react";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductCard } from "./ProductCard";
import { databaseSetup } from "@/lib/databaseSetup";
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
  { id: "f1", name: "Guava", price: 100, image: "https://images.unsplash.com/photo-1689996647327-5d263fbbc79d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "fruits", description: "Sweet and nutritious guava, rich in vitamins and fiber.", isOrganic: false, inStock: true },
  { id: "f2", name: "Papaya", price: 40, image: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?auto=format&fit=crop&w=400&q=80", category: "fruits", description: "Sweet and nutritious papaya, rich in vitamins.", isOrganic: false, inStock: true },
  { id: "f3", name: "Chikoo", price: 60, image: "https://media.istockphoto.com/id/1194253610/photo/sapodilla-fruit.webp?a=1&b=1&s=612x612&w=0&k=20&c=w_sksaMdSKtGoY-NcTsT0GbNgloUy48VcUcxEdJqq9M=", category: "fruits", description: "Sweet and creamy chikoo, perfect for desserts.", isOrganic: false, inStock: true },
  { id: "f4", name: "Lemon", price: 100, image: "https://plus.unsplash.com/premium_photo-1674481037651-32a7422b4fc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxlbW9ufGVufDB8fDB8fHww", category: "fruits", description: "Fresh lemons, perfect for cooking and beverages.", isOrganic: false, inStock: true },
  
  // Vegetables
  { id: "v1", name: "Mushroom", price: 467, image: "https://media.istockphoto.com/id/1354903890/photo/flat-lay-photograph-of-fresh-whole-white-button-mushrooms.webp?a=1&b=1&s=612x612&w=0&k=20&c=v4JGe-_Nov-qZswKqltxmz-j9FrHiiof7HGa_I2dlv8=", category: "vegetables", description: "Fresh mushrooms, perfect for cooking and salads.", isOrganic: false, inStock: true },
  { id: "v2", name: "Curry Leaves", price: 80, image: "https://media.istockphoto.com/id/136146217/photo/curry-leaves.jpg?s=612x612&w=0&k=20&c=EWN5h9cng9yLK8FZ3uPRfjCFWQCIJwTz65NpwQgCpNA=", category: "vegetables", description: "Fresh curry leaves bundle, essential for Indian cooking.", isOrganic: false, inStock: true },
  { id: "v3", name: "Moringa Leaves", price: 80, image: "https://media.istockphoto.com/id/486420267/photo/moringa-leaves.jpg?s=612x612&w=0&k=20&c=hxIBIJLZ0G4glVNdE3eWIHvv64BeosD7cxuh41NIYYI=", category: "vegetables", description: "Nutritious moringa leaves bundle, rich in vitamins.", isOrganic: false, inStock: true },
  { id: "v4", name: "Pumpkin", price: 20, image: "https://images.unsplash.com/photo-1665881769209-9ebd73ab7b9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHB1bXBraW4lMjBpbmRpYW58ZW58MHx8MHx8fDA%3D", category: "vegetables", description: "Fresh pumpkin, perfect for curries and soups.", isOrganic: false, inStock: true },
  { id: "v5", name: "Lemon Grass", price: 80, image: "https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVtb24lMjBncmFzc3xlbnwwfHwwfHx8MA%3D%3D", category: "vegetables", description: "Fresh lemon grass bundle, aromatic and flavorful.", isOrganic: false, inStock: true },
  
  // Grains
  { id: "g1", name: "Rice Indrayani", price: 100, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Premium Indrayani rice, perfect for daily cooking.", isOrganic: false, inStock: true },
  { id: "g2", name: "Rice Indrayani Cut1", price: 40, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",category: "grains", description: "Cut Indrayani rice, quick cooking variety.", isOrganic: false, inStock: true },
  { id: "g3", name: "Rice Indrayani Crushed", price: 40, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Crushed Indrayani rice, ideal for rice dishes.", isOrganic: false, inStock: true },
  { id: "g4", name: "Rice Shakti Full", price: 100, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Full grain Shakti rice, nutritious and filling.", isOrganic: false, inStock: true },
  { id: "g5", name: "Rice Shakti Cut", price: 60, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Cut Shakti rice, faster cooking option.", isOrganic: false, inStock: true },
  { id: "g6", name: "Rice Shakti Crushed", price: 40, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80", category: "grains", description: "Crushed Shakti rice, perfect for rice preparations.", isOrganic: false, inStock: true },
  { id: "g7", name: "Mustard", price: 400, image: "https://plus.unsplash.com/premium_photo-1725551070695-303d5790b287?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG11c3RhcmR8ZW58MHx8MHx8fDA%3D", category: "grains", description: "Pure mustard seeds, essential for pickling and cooking.", isOrganic: false, inStock: true },
  { id: "g8", name: "Nagali", price: 120, image: "https://images.unsplash.com/photo-1653580524515-77b19c176b88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFnaXxlbnwwfHwwfHx8MA%3D%3D", category: "grains", description: "Traditional Nagali grain, nutritious and healthy.", isOrganic: false, inStock: true },
  
  // Dairy
  { id: "d1", name: "A2 Gir Cow Milk", price: 150, image: "https://media.istockphoto.com/id/535489242/photo/pouring-milk-in-the-glass-on-the-background-of-nature.webp?a=1&b=1&s=612x612&w=0&k=20&c=Nfz1s4h4WZfMVIw3wxni69Fq-jxOz1jkrjxCF5GBs1k=", category: "dairy", description: "Premium A2 Gir Cow Milk, rich in nutrients and free from A1 protein. Sourced from healthy Gir cows, perfect for families seeking natural, easily digestible milk. Price per litre.", isOrganic: false, inStock: true, unit: "litre" },
  { id: "d2", name: "Ghee", price: 3000, image: "https://media.istockphoto.com/id/1187181045/photo/pure-or-desi-ghee-clarified-melted-butter-healthy-fats-bulletproof-diet-concept-or-paleo.webp?a=1&b=1&s=612x612&w=0&k=20&c=SQlM0ESr2hxs2HsOzRTkjonfFtlHXQFVTKLfaaHWOVg=", category: "dairy", description: "Pure, clarified butter made from fresh cream. Traditional and aromatic ghee perfect for cooking and religious ceremonies.", isOrganic: false, inStock: true, unit: "kg" },
  { id: "d3", name: "Chaas", price: 40, image: "https://images.unsplash.com/photo-1630409346699-79481a79db52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0dGVybWlsa3xlbnwwfHwwfHx8MA%3D%3D", category: "dairy", description: "Fresh buttermilk, cooling and nutritious.", isOrganic: false, inStock: true, unit: "litre" },
  { id: "d4", name: "Honey", price: 1000, image: "https://media.istockphoto.com/id/598241944/photo/honey-in-jar-and-bunch-of-dry-lavender.jpg?s=612x612&w=0&k=20&c=gVg1BaJ78uniQbpfdFiYvMzim98gREdx-5c4ENBp2tE=", category: "dairy", description: "Pure natural honey, sweet and healthy.", isOrganic: false, inStock: true, unit: "litre" },
  
  // Eco Friendly Products
  { id: "eco1", name: "Dhupbatti Chandan", price: 120, image: "https://media.istockphoto.com/id/1308063303/photo/dhoop-wooden-stick.webp?a=1&b=1&s=612x612&w=0&k=20&c=7Wmhm9_i-nUM0WPhxSP4yyQ-T0rxoZ9eGos59SoxsY0=", category: "eco", description: "Sandalwood incense sticks, aromatic and spiritual.", isOrganic: false, inStock: true, unit: "pack of 30" },
  { id: "eco2", name: "Dhupbatti Lobhan", price: 120, image: "https://media.istockphoto.com/id/1308063303/photo/dhoop-wooden-stick.webp?a=1&b=1&s=612x612&w=0&k=20&c=7Wmhm9_i-nUM0WPhxSP4yyQ-T0rxoZ9eGos59SoxsY0=", category: "eco", description: "Lobhan incense sticks, purifying and traditional.", isOrganic: false, inStock: true, unit: "pack of 30" },
  { id: "eco3", name: "Dhupbatti Havan", price: 100, image: "https://media.istockphoto.com/id/1308063303/photo/dhoop-wooden-stick.webp?a=1&b=1&s=612x612&w=0&k=20&c=7Wmhm9_i-nUM0WPhxSP4yyQ-T0rxoZ9eGos59SoxsY0=", category: "eco", description: "Havan incense sticks, for spiritual ceremonies.", isOrganic: false, inStock: true, unit: "pack of 30" },
  { id: "eco4", name: "Dhupbatti Mosquito Repellent", price: 100, image: "https://media.istockphoto.com/id/1308063303/photo/dhoop-wooden-stick.webp?a=1&b=1&s=612x612&w=0&k=20&c=7Wmhm9_i-nUM0WPhxSP4yyQ-T0rxoZ9eGos59SoxsY0=", category: "eco", description: "Natural mosquito repellent incense sticks.", isOrganic: false, inStock: true, unit: "pack of 30" },
  { id: "eco5", name: "Cow Dung Powder", price: 50, image: "https://plus.unsplash.com/premium_photo-1726072358351-b01ffa2f830b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y293JTIwZHVuZyUyMHBvd2RlcnxlbnwwfHwwfHx8MA%3D%3D", category: "eco", description: "Pure, sun-dried cow dung powder, perfect for organic farming and gardening.", isOrganic: false, inStock: true, unit: "kg" },
  { id: "eco6", name: "Cow Dung Cake", price: 50, image: "https://media.istockphoto.com/id/530529887/photo/drying-cow-dung-for-fire.jpg?s=612x612&w=0&k=20&c=E1RtY4r3rkNVMu-Di_7jQlGVnpyzQwZuzq56tpcQgIw=", category: "eco", description: "Traditional cow dung cakes, eco-friendly fuel and fertilizer.", isOrganic: false, inStock: true, unit: "pack of 10" },
  
  // Handmade Warli Painted
  { id: "warli1", name: "Penstand", price: 150, image: "https://imgs.search.brave.com/HLWVqXcs-bmYLK24NavgFAbYf2tUQnMPvjvp0JWlUhs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93ZXRv/eXRveS5jb20vY2Ru/L3Nob3AvZmlsZXMv/V2FybGlBcnQtUGVu/U3RhbmRCVy5qcGc_/Y3JvcD1jZW50ZXIm/aGVpZ2h0PTIwNDgm/dj0xNzMwNjMxNDkw/JndpZHRoPTIwNDg", category: "warli", description: "Beautiful handcrafted Warli painted penstand, traditional tribal art design.", isOrganic: false, inStock: true, unit: "piece" }
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
  const [dbStatus, setDbStatus] = useState<string>("");
  const { addToCart, removeFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user, loading: userLoading } = useSupabaseUser();

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

  const handleAddToCart = async (product: any) => {
    console.log('Adding to cart:', product.name);
    console.log('User state:', user);
    console.log('User loading:', userLoading);
    
    if (!user) {
      setCartAlert(`Please login to add ${product.name} to cart`);
      setTimeout(() => setCartAlert(""), 3000);
      return;
    }

    const success = await addToCart(product);
    if (success) {
      setCartAlert(`${product.name} added to cart!`);
      setTimeout(() => setCartAlert(""), 3000);
    } else {
      setCartAlert(`Failed to add ${product.name} to cart. Please try again.`);
      setTimeout(() => setCartAlert(""), 3000);
    }
  };

  const handleAddToWishlist = async (product: any) => {
    console.log('Adding to wishlist:', product.name);
    console.log('User state:', user);
    console.log('User loading:', userLoading);
    
    if (!user) {
      setWishlistAlert(`Please login to add ${product.name} to wishlist`);
      setTimeout(() => setWishlistAlert(""), 3000);
      return;
    }

    const success = await addToWishlist(product);
    if (success) {
      setWishlistAlert(`${product.name} added to wishlist!`);
      setTimeout(() => setWishlistAlert(""), 3000);
    } else {
      setWishlistAlert(`Failed to add ${product.name} to wishlist. Please try again.`);
      setTimeout(() => setWishlistAlert(""), 3000);
    }
  };

  const checkDatabase = async () => {
    setDbStatus("Checking database...");
    try {
      const tablesExist = await databaseSetup.checkAndCreateTables();
      if (tablesExist) {
        setDbStatus("Database tables exist. Testing insert functionality...");
        
        // Test insert functionality with detailed logging
        const insertTest = await databaseSetup.testInsert();
        if (insertTest) {
          setDbStatus("✅ Database tables exist and insert functionality works!");
        } else {
          setDbStatus("❌ Database tables exist but insert failed. Check browser console for details.");
        }
      } else {
        setDbStatus("❌ Database tables do not exist. Please run the SQL setup script.");
      }
    } catch (error) {
      setDbStatus(`❌ Database check failed: ${error}`);
    }
  };

  // Test actual cart functionality
  const testCartFunctionality = async () => {
    if (!user?.id) {
      setDbStatus("❌ User not authenticated. Please login first.");
      return;
    }

    setDbStatus("Testing actual cart functionality...");
    
    try {
      // Test adding a real item to cart
      const testProduct = {
        id: "test-cart-item",
        name: "Test Cart Item",
        price: 100,
        image: "test-image.jpg",
        category: "test",
        description: "Test description",
        isOrganic: false,
        inStock: true
      };

      console.log('Testing cart functionality with user:', user.id);
      console.log('Test product:', testProduct);

      const success = await addToCart(testProduct);
      
      if (success) {
        setDbStatus("✅ Cart functionality works! Test item added successfully.");
        
        // Clean up test item
        setTimeout(async () => {
          await removeFromCart("test-cart-item");
          console.log('Test cart item cleaned up');
        }, 2000);
      } else {
        setDbStatus("❌ Cart functionality failed. Check browser console for details.");
      }
    } catch (error) {
      setDbStatus(`❌ Cart test error: ${error}`);
    }
  };

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

		{/* Debug Authentication Status */}
		{process.env.NODE_ENV === 'development' && (
		  <div className="mb-4 p-4 bg-gray-100 rounded-lg">
			<h3 className="font-semibold mb-2">Debug Info:</h3>
			<p>User Loading: {userLoading ? 'Yes' : 'No'}</p>
			<p>User Authenticated: {user ? 'Yes' : 'No'}</p>
			<p>User ID: {user?.id || 'None'}</p>
			<p>User Email: {user?.email || 'None'}</p>
			<div className="mt-2 space-y-2">
			  <Button onClick={checkDatabase} size="sm" variant="outline">
				Check Database
			  </Button>
			  <Button onClick={testCartFunctionality} size="sm" variant="outline" className="ml-2">
				Test Cart Functionality
			  </Button>
			</div>
			{dbStatus && (
			  <p className="mt-2 text-sm text-gray-600">{dbStatus}</p>
			)}
		  </div>
		)}

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
				<div key={product.id} className="transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl rounded-xl">
				<ProductCard
				  {...product}
				  onAddToCart={() => handleAddToCart(product)}
				  onAddToWishlist={() => handleAddToWishlist(product)}
				  onRemoveFromWishlist={async () => {
					await removeFromWishlist(product.id);
				  }}
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
