// import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductsSection } from "@/components/ProductsSection";
import { AboutSection } from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <NavBar onCartClick={() => setCartOpen(true)} />
      {/* <Header onCartClick={() => setCartOpen(true)} /> */}
      <Hero />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;
