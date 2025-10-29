-- Migration to remove categories from existing database
-- Run this if you already have the old schema with categories

SET FOREIGN_KEY_CHECKS = 0;

-- Drop foreign key constraint from products table
ALTER TABLE products DROP FOREIGN KEY IF EXISTS fk_products_category;

-- Drop the index
ALTER TABLE products DROP INDEX IF EXISTS idx_products_category;

-- Remove category_id column from products
ALTER TABLE products DROP COLUMN IF EXISTS category_id;

-- Drop categories table
DROP TABLE IF EXISTS categories;

SET FOREIGN_KEY_CHECKS = 1;
