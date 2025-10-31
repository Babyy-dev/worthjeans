import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import { query } from '../utils/db.js';

dotenv.config();

const products = [
  {
    id: randomUUID(),
    name: 'Classic Slim Fit Jeans',
    slug: 'classic-slim-fit-jeans',
    category: 'narrow-fit',
    description: 'Our best-selling slim fit jeans crafted from premium stretch denim. Perfect for everyday wear with a modern, tailored look that flatters every body type.',
    price: 2499,
    original_price: 3999,
    stock: 150,
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop'
    ]),
    is_featured: 1,
    is_active: 1
  },
  {
    id: randomUUID(),
    name: 'Vintage Straight Leg Denim',
    slug: 'vintage-straight-leg-denim',
    category: 'straight-fit',
    description: 'Timeless straight leg jeans with a relaxed fit. Made from 100% organic cotton denim with a vintage wash finish that gets better with age.',
    price: 2799,
    original_price: 4299,
    stock: 120,
    image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=1000&fit=crop'
    ]),
    is_featured: 1,
    is_active: 1
  },
  {
    id: randomUUID(),
    name: 'Wide Leg Palazzo Jeans',
    slug: 'wide-leg-palazzo-jeans',
    category: 'wide-leg',
    description: 'Flowing wide-leg jeans that combine comfort with sophistication. Features a high-rise waist and relaxed fit perfect for creating elegant silhouettes.',
    price: 2999,
    original_price: 4599,
    stock: 100,
    image_url: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=1000&fit=crop',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop'
    ]),
    is_featured: 1,
    is_active: 1
  },
  {
    id: randomUUID(),
    name: 'Urban Cargo Utility Jeans',
    slug: 'urban-cargo-utility-jeans',
    category: 'cargo',
    description: 'Rugged cargo jeans with multiple utility pockets. Combines street style with functionality, made from durable yet comfortable stretch canvas denim.',
    price: 3299,
    original_price: 4999,
    stock: 80,
    image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop'
    ]),
    is_featured: 1,
    is_active: 1
  }
];

async function seedProducts() {
  console.log('Seeding products...');

  for (const product of products) {
    try {
      // Check if product already exists
      const existing = await query('SELECT id FROM products WHERE slug = ?', [product.slug]);
      
      if (existing.length > 0) {
        console.log(`Product "${product.name}" already exists, skipping...`);
        continue;
      }

      await query(
        `INSERT INTO products 
        (id, name, slug, category, description, price, original_price, stock, image_url, images, is_featured, is_active) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.id,
          product.name,
          product.slug,
          product.category,
          product.description,
          product.price,
          product.original_price,
          product.stock,
          product.image_url,
          product.images,
          product.is_featured,
          product.is_active
        ]
      );

      console.log(`✓ Added product: ${product.name}`);
    } catch (error) {
      console.error(`Error adding product ${product.name}:`, error);
    }
  }

  console.log('Product seeding completed!');
  process.exit(0);
}

seedProducts().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
