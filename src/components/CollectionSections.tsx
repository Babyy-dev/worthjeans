import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const collections = [
  {
    title: 'Premium Denim Collection',
    subtitle: 'Crafted for Comfort, Designed for Style',
    description: 'Experience the perfect blend of timeless design and modern comfort. Our premium denim collection features carefully selected fabrics that move with you, creating pieces that feel as good as they look.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop',
    link: '/collections/narrow-fit',
    alignment: 'left'
  },
  {
    title: 'Effortless Everyday',
    subtitle: 'From Morning Coffee to Evening Strolls',
    description: 'Easy fits, versatile vibes, endless possibilities. This collection is all about feeling confident without trying too hard. Because your everyday deserves a touch of excellence.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop',
    link: '/collections/straight-fit',
    alignment: 'right'
  },
  {
    title: 'Urban Edge Collection',
    subtitle: 'Bold Styles for the Modern Explorer',
    description: 'Statement pieces that command attention. From cargo utility to wide-leg freedom, discover jeans that reflect your dynamic lifestyle and fearless spirit.',
    image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=1000&fit=crop',
    link: '/collections/cargo',
    alignment: 'left'
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1, ease: "easeOut" }
};

const scaleIn = {
  initial: { scale: 1.1, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
};

export default function CollectionSections() {
  return (
    <div className="bg-background">
      {collections.map((collection, index) => (
        <section
          key={index}
          className={`py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 ${
            index % 2 === 0 ? 'bg-background' : 'bg-muted/30'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${
                collection.alignment === 'right' ? 'md:grid-flow-dense' : ''
              }`}
            >
              {/* Image */}
              <motion.div
                {...fadeIn}
                className={`relative overflow-hidden rounded-lg ${
                  collection.alignment === 'right' ? 'md:col-start-2' : ''
                }`}
              >
                <motion.div
                  {...scaleIn}
                  className="aspect-[3/4] w-full"
                >
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                {...fadeInUp}
                className={`space-y-4 md:space-y-6 ${
                  collection.alignment === 'right' ? 'md:col-start-1 md:row-start-1' : ''
                }`}
              >
                <div className="space-y-2">
                  <motion.p
                    initial={{ opacity: 0, x: collection.alignment === 'right' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xs md:text-sm font-medium tracking-wider uppercase text-muted-foreground"
                  >
                    {collection.subtitle}
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, x: collection.alignment === 'right' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light tracking-tight"
                  >
                    {collection.title}
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg"
                >
                  {collection.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link to={collection.link}>
                    <Button
                      size="lg"
                      className="group relative overflow-hidden px-6 md:px-8 py-4 md:py-6 text-sm md:text-base w-full sm:w-auto"
                    >
                      <span className="relative z-10">Shop Now</span>
                      <motion.div
                        className="absolute inset-0 bg-accent-foreground"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Brand Story Section with Parallax */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1920&h=1080&fit=crop)',
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            {...fadeInUp}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white">
              Worth Wearing
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Every stitch tells a story. Every detail matters.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto"
          >
            At Worth Jeans, we believe that exceptional denim isn't just worn—it's experienced. 
            Our commitment to quality, sustainability, and timeless design creates pieces that become 
            part of your story, season after season.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Our Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
