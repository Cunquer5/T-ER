import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductsSection } from "@/components/ProductsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import NavBar from "@/components/NavBar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Header />
      <Hero />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
