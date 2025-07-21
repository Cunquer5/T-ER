import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Organic farm landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="font-script text-harvest-gold">Nareshwadi</span>
            <br />
            Fresh from the Farm
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Fresh, organic produce straight from local farms to your table. 
            Supporting farmers, nourishing communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="harvest" size="xl" className="group">
              Shop Fresh Now
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" size="xl" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-harvest-gold">50+</div>
              <div className="text-sm text-gray-300">Local Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-harvest-gold">100%</div>
              <div className="text-sm text-gray-300">Organic</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-harvest-gold">5K+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-harvest-gold">24hr</div>
              <div className="text-sm text-gray-300">Fresh Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronRight className="h-6 w-6 rotate-90" />
      </div>
    </section>
  );
};