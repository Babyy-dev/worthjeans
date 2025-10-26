import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";
import { FloatingButtons } from "@/components/FloatingButtons";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-foreground/40" />
          </div>
          <div className="relative z-10 text-center text-background">
            <h1 className="text-5xl md:text-6xl font-serif font-semibold mb-4">
              About Élégance
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              Where timeless style meets everyday elegance
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Founded with a vision to bring sophisticated style to every woman's wardrobe, 
                Élégance has become synonymous with timeless fashion that transcends trends. 
                Our journey began with a simple belief: every woman deserves to feel confident, 
                elegant, and beautiful in what she wears.
              </p>
              <p className="text-lg leading-relaxed">
                We carefully curate each piece in our collection, focusing on quality fabrics, 
                flattering silhouettes, and versatile designs that seamlessly transition from 
                day to night. Whether you're looking for a stunning dress for a special occasion 
                or a perfectly coordinated set for everyday elegance, we have something special 
                waiting for you.
              </p>
              <p className="text-lg leading-relaxed">
                At Élégance, we believe that fashion should be effortless yet refined. Our pieces 
                are designed to make you feel your best, with attention to detail and a commitment 
                to excellence that shows in every stitch.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-serif font-semibold mb-4">Quality First</h3>
                <p className="text-muted-foreground">
                  We believe in creating pieces that last, using premium fabrics and 
                  meticulous craftsmanship in every garment.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-serif font-semibold mb-4">Timeless Design</h3>
                <p className="text-muted-foreground">
                  Our collections focus on classic silhouettes that remain elegant season 
                  after season, transcending fleeting trends.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-serif font-semibold mb-4">Exceptional Service</h3>
                <p className="text-muted-foreground">
                  From browsing to delivery, we're committed to providing an exceptional 
                  experience at every step of your journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Join Our Story
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Discover the elegance that awaits you. Explore our collections and find 
              pieces that speak to your style.
            </p>
            <Link 
              to="/collections"
              className="inline-block px-8 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default About;
