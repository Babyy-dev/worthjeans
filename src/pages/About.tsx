import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Award, Users, Sparkles, Heart } from "lucide-react";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Every pair of Worth Jeans is crafted from the finest denim, ensuring durability, comfort, and a perfect fit that lasts season after season."
    },
    {
      icon: Sparkles,
      title: "Timeless Design",
      description: "Our collections blend classic denim heritage with contemporary style, creating pieces that remain relevant and elegant year after year."
    },
    {
      icon: Heart,
      title: "Sustainable Practice",
      description: "We're committed to responsible manufacturing, using eco-friendly processes and materials that respect both people and planet."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "From design to delivery, every decision we make is guided by our commitment to providing an exceptional experience for our customers."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-muted/50 via-background to-muted/30">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm font-medium tracking-wider uppercase text-muted-foreground"
              >
                Our Story
              </motion.p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight">
                Worth Wearing,
                <br />
                <span className="italic">Worth Believing</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                Where exceptional denim craftsmanship meets contemporary style. 
                Every stitch tells a story of quality, comfort, and timeless design.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Story Section with Images */}
        <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
              <motion.div {...fadeInUp} className="order-2 md:order-1">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop"
                    alt="Denim craftsmanship"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
              
              <motion.div {...fadeInUp} className="order-1 md:order-2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">
                  Crafted with Passion
                </h2>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Founded on the belief that exceptional denim should be accessible to everyone, 
                    Worth Jeans has been redefining comfort and style since day one. Our journey began 
                    with a simple mission: create jeans that people truly love to wear.
                  </p>
                  <p>
                    We source premium denim from the world's finest mills and work with skilled 
                    artisans who understand that every detail matters. From the first sketch to the 
                    final stitch, we're obsessed with creating jeans that fit perfectly and feel 
                    even better.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div {...fadeInUp} className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">
                  Designed for Life
                </h2>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Our collections are thoughtfully designed to move with you through every moment 
                    of your day. Whether you're heading to the office, exploring the city, or 
                    enjoying a night out, Worth Jeans adapt to your lifestyle.
                  </p>
                  <p>
                    We believe in creating pieces that transcend trends—classics that you'll reach 
                    for again and again. Because the best fashion isn't just what looks good; it's 
                    what makes you feel confident, comfortable, and authentically you.
                  </p>
                </div>
              </motion.div>
              
              <motion.div {...fadeInUp}>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop"
                    alt="Lifestyle denim"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16 space-y-4"
            >
              <p className="text-sm font-medium tracking-wider uppercase text-muted-foreground">
                What We Stand For
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
                Our Values
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-4">
                      <Icon className="w-10 h-10 text-foreground" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
              Experience the Difference
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover why thousands choose Worth Jeans for their everyday style. 
              Explore our collections and find your perfect fit.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/collections">
                <Button size="lg" className="px-8 py-6 text-base">
                  Shop Collections
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="px-8 py-6 text-base border-2">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default About;
