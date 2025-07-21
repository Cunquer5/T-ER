import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { useState, useEffect } from "react";


interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  isOrganic?: boolean;
  inStock?: boolean;
  onAddToCart?: () => void;
}

export const ProductCard = (props: ProductCardProps) => {
  const {
    id,
    name,
    price,
    image,
    category,
    description,
    isOrganic = true,
    inStock = true,
    onAddToCart
  } = props;

  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlisted(wishlist.includes(id));
  }, [id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter((pid: string) => pid !== id);
      setWishlisted(false);
    } else {
      updated = [...wishlist, id];
      setWishlisted(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <Card className="group hover:shadow-organic transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isOrganic && (
          <Badge className="absolute top-2 left-2 bg-leaf-green text-white">
            Organic
          </Badge>
        )}
        <Button
          size="icon"
          variant={wishlisted ? "default" : "ghost"}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={toggleWishlist}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "text-red-500 fill-red-500" : ""}`} />
        </Button>
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">{category}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-primary">₹{price}</p>
            <p className="text-xs text-muted-foreground">per kg</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="organic" 
          size="sm" 
          className="w-full" 
          disabled={!inStock}
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}