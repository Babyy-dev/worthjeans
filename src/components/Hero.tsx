import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-[85vh] sm:h-[90vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-xl">
          <h1 className="hero-title-mobile sm:text-4xl md:text-5xl lg:text-7xl font-serif font-semibold sm:mb-6 animate-fade-in text-white leading-tight">
            Worth Jeans - Style with Comfort
          </h1>
          <p
            className="hero-description-mobile sm:text-lg md:text-xl text-gray-200 sm:mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Premium quality jeans and fashion that deliver comfort, style, and
            lasting value
          </p>
          <Button
            size="lg"
            className="hero-button-mobile sm:max-w-none bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 animate-fade-in sm:w-auto"
            style={{ animationDelay: "0.4s" }}
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
