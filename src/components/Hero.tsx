import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-serif font-semibold mb-6 animate-fade-in">
            Elegance, Everyday
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover timeless pieces that elevate your wardrobe with sophistication and grace
          </p>
          <Button 
            size="lg" 
            className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            asChild
          >
            <Link to="/collections">Shop now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
