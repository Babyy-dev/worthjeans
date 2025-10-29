import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FloatingButtons } from "@/components/FloatingButtons";
import { api } from "@/lib/api";

const Collections = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryNames: { [key: string]: string } = {
    "narrow-fit": "Narrow Fit",
    "flare-cut": "Flare Cut",
    "straight-fit": "Straight Fit",
    "wide-leg": "Wide Leg",
    "cargo": "Cargo",
  };

  const displayCategory = category ? categoryNames[category] || category : "All Collections";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = '/products?is_active=1';
        if (category) {
          url += `&category=${category}`;
        }
        const data = await api.get(url);
        setProducts(data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-3 sm:mb-4 text-center">
              {displayCategory}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl mx-auto">
              {category 
                ? `Browse our ${displayCategory} collection - premium quality jeans designed for comfort and style.`
                : "Explore our complete collection of premium jeans, designed to elevate your everyday style."}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {products.length} products
            </p>
            <div className="w-full sm:w-auto">
              <Select defaultValue="featured">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-12 sm:py-20">Loading products...</div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-20">
                <p className="text-muted-foreground">No products available yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Collections;
