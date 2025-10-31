import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const demoProducts = [
  {
    id: 'demo-1',
    name: 'Classic Slim Fit Jeans',
    slug: 'classic-slim-fit-jeans',
    category: 'narrow-fit',
    description: 'Our best-selling slim fit jeans crafted from premium stretch denim.',
    price: 2499,
    original_price: 3999,
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop',
  },
  {
    id: 'demo-2',
    name: 'Vintage Straight Leg Denim',
    slug: 'vintage-straight-leg-denim',
    category: 'straight-fit',
    description: 'Timeless straight leg jeans with a relaxed fit.',
    price: 2799,
    original_price: 4299,
    image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop',
  },
  {
    id: 'demo-3',
    name: 'Wide Leg Palazzo Jeans',
    slug: 'wide-leg-palazzo-jeans',
    category: 'wide-leg',
    description: 'Flowing wide-leg jeans that combine comfort with sophistication.',
    price: 2999,
    original_price: 4599,
    image_url: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=1000&fit=crop',
  },
  {
    id: 'demo-4',
    name: 'Urban Cargo Utility Jeans',
    slug: 'urban-cargo-utility-jeans',
    category: 'cargo',
    description: 'Rugged cargo jeans with multiple utility pockets.',
    price: 3299,
    original_price: 4999,
    image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop',
  }
];

export default function NewCollections() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 space-y-4"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm font-medium tracking-wider uppercase text-muted-foreground"
        >
          New Arrivals
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight"
        >
          New Collections
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Discover our latest styles. Fresh designs, timeless quality.
        </motion.p>
      </motion.div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
        {demoProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
