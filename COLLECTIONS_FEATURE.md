# Collections Dropdown Feature

## Overview
Added a Collections dropdown menu with different jean fit types that allows users to filter products by category.

## Categories Available
- **Narrow Fit** (slug: `narrow-fit`)
- **Flare Cut** (slug: `flare-cut`)
- **Straight Fit** (slug: `straight-fit`)
- **Wide Leg** (slug: `wide-leg`)
- **Cargo** (slug: `cargo`)

## Frontend Changes

### 1. **Navbar Component** (`src/components/Navbar.tsx`)
- Added Collections dropdown menu (desktop)
- Hover to open dropdown with category links
- Mobile menu now shows expandable Collections section
- Routes to `/collections/{category-slug}`

### 2. **Collections Page** (`src/pages/Collections.tsx`)
- Updated to accept optional `category` parameter from URL
- Filters products by category when selected
- Dynamic page title based on selected category
- Falls back to "All Collections" when no category selected

### 3. **App Routing** (`src/App.tsx`)
- Added new route: `/collections/:category`
- Keeps existing `/collections` route for all products

### 4. **Admin Product Form** (`src/components/admin/ProductForm.tsx`)
- Added Category dropdown field
- Categories can be assigned when creating/editing products
- Dropdown includes all available jean fit types

## Backend Changes

### 1. **Database Schema**
**Migration File:** `backend/sql/add_category.sql`
```sql
ALTER TABLE products 
ADD COLUMN category VARCHAR(50) NULL AFTER slug;

CREATE INDEX idx_products_category ON products(category);
```

### 2. **Product Controller** (`backend/src/controllers/product.controller.ts`)
- Added `category` query parameter support
- Added `category` field validation for create/update

### 3. **Product Model** (`backend/src/models/product.model.ts`)
- Updated `list()` to support category filtering
- Updated `create()` to include category field
- Updated `update()` to include category field

## Setup Instructions

### 1. **Run Database Migration**
Execute the SQL migration to add the category column:
```bash
mysql -h your-host -u your-user -p your_database < backend/sql/add_category.sql
```

Or run manually in your MySQL client:
```sql
ALTER TABLE products ADD COLUMN category VARCHAR(50) NULL AFTER slug;
CREATE INDEX idx_products_category ON products(category);
```

### 2. **No Frontend Dependencies Needed**
All required UI components already exist in the project.

### 3. **Test the Feature**
1. Start the backend: `npm run dev` (in backend directory)
2. Start the frontend: `npm run dev` (in root directory)
3. Navigate to any collection type from the navbar dropdown
4. Create/edit products in admin panel with category assignment

## API Usage

### Filter Products by Category
```
GET /api/products?category=narrow-fit&is_active=1
```

### Create Product with Category
```
POST /api/products
{
  "name": "Slim Fit Jeans",
  "slug": "slim-fit-jeans",
  "category": "narrow-fit",
  "price": 2999,
  ...
}
```

## User Flow

1. **Desktop:**
   - Hover over "Collections" in navbar
   - Dropdown appears with all jean types
   - Click on any type to view filtered products

2. **Mobile:**
   - Tap burger menu icon
   - Tap "Collections" to expand
   - Select any jean type from the list

3. **Admin:**
   - Go to Admin → Products
   - Create/Edit product
   - Select category from dropdown
   - Products are now filterable by category

## Notes
- Categories are optional - products without a category will show in "All Collections"
- Category filtering works alongside other filters (featured, active, etc.)
- URLs are SEO-friendly with readable category slugs
- Mobile responsive with touch-friendly menus
