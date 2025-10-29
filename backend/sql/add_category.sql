-- Add category field to products table

ALTER TABLE products 
ADD COLUMN category VARCHAR(50) NULL AFTER slug;

-- Add index for faster category filtering
CREATE INDEX idx_products_category ON products(category);
