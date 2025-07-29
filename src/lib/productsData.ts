export const sampleProducts = [
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
  { id: "d1", name: "Milk", price: 110, image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=400&q=80", category: "dairy", description: "Fresh milk, delivered daily.", isOrganic: false, inStock: true, unit: "litre" },
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
