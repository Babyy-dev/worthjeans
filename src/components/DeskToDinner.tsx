import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function DeskToDinner() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for images
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  
  // Opacity fade
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 z-10"
          >
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm font-medium tracking-wider uppercase text-muted-foreground"
              >
                Versatile Style
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight leading-tight"
              >
                Desk to Dinner
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              From polished work hours to effortless evening style. Discover denim that transitions 
              seamlessly through your day, combining professional polish with relaxed sophistication.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link to="/collections/straight-fit">
                <Button size="lg" className="group relative overflow-hidden px-8 py-6">
                  <span className="relative z-10">Shop Collection</span>
                  <motion.div
                    className="absolute inset-0 bg-accent-foreground"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
              <Link to="/collections">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-6 border-2 hover:bg-accent/10"
                >
                  View All
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Parallax Images Grid */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Background decorative element */}
            <motion.div
              style={{ opacity }}
              className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl"
            />

            {/* Image 1 - Top Left */}
            <motion.div
              style={{ y: y1 }}
              className="absolute top-0 left-0 w-[45%] md:w-[45%] h-[40%] md:h-[45%] z-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop"
                  alt="Professional denim style"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>

            {/* Image 2 - Center Right */}
            <motion.div
              style={{ y: y2 }}
              className="absolute top-[15%] md:top-[20%] right-0 w-[55%] md:w-[55%] h-[50%] md:h-[55%] z-30"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop"
                  alt="Evening casual style"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>

            {/* Image 3 - Bottom Left */}
            <motion.div
              style={{ y: y3 }}
              className="absolute bottom-0 left-[10%] md:left-[15%] w-[50%] md:w-[50%] h-[35%] md:h-[40%] z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&h=800&fit=crop"
                  alt="Versatile denim"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            </motion.div>

            {/* Decorative accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
            />
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
    </section>
  );
}
