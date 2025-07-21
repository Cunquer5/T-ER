import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Nareshwadi</h1>
              <p className="text-xs text-muted-foreground font-script">Fresh from farm</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#products" className="text-foreground hover:text-primary transition-colors">Products</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Link
                to="/cart"
                className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-leaf-green text-white rounded-full text-xs px-2 py-0.5">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-foreground hover:text-primary transition-colors py-2">Home</a>
              <a href="#products" className="text-foreground hover:text-primary transition-colors py-2">Products</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors py-2">About</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors py-2">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};