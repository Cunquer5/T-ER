import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Leaf,
  Heart
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-harvest-gold rounded-full flex items-center justify-center">
                <Leaf className="h-5 w-5 text-soil-brown" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nareshwadi</h3>
                <p className="text-sm opacity-80 font-script">Fresh from farm</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Connecting local farmers with conscious consumers through organic, 
              sustainable products that nourish communities.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="opacity-80 hover:opacity-100 transition-opacity">Home</a></li>
              <li><a href="#products" className="opacity-80 hover:opacity-100 transition-opacity">Products</a></li>
              <li><a href="#about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Farm Tours</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Bulk Orders</a></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Fresh Vegetables</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Organic Fruits</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Grains & Cereals</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Dairy Products</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Herbs & Spices</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Seasonal Special</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="opacity-80">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="opacity-80">info@nareshwadiproducts.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span className="opacity-80">Nareshwadi Village, Pune District, Maharashtra</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm opacity-80 mb-2">Subscribe for fresh updates</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email"
                  className="bg-primary-light/20 border-primary-light/30 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="harvest" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-light/30" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
          <div className="flex items-center gap-4">
            <p>&copy; 2024 Nareshwadi Products. All rights reserved.</p>
            <span className="hidden md:inline">|</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-tomato" />
              <span>for farmers</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};