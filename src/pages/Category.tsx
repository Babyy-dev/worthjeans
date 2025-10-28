import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import dressesImage from "@/assets/category-dresses.jpg";
import { api } from "@/lib/api";
import coordsImage from "@/assets/category-coords.jpg";
import { FloatingButtons } from "@/components/FloatingButtons";

const Category = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get('/categories');
        setCategories(data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const defaultCategories = [
    {
      id: 1,
      name: "Dresses",
      description: "Timeless silhouettes that flatter in every setting",
      image_url: dressesImage,
      count: 0,
    },
    {
      id: 2,
      name: "Co-ords & Sets",
      description: "Perfectly paired sets that balance ease with chic",
      image_url: coordsImage,
      count: 0,
    },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-center">
              Shop by Category
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Discover our carefully curated categories, each designed to help you find 
              the perfect piece for any occasion.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">Loading categories...</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {displayCategories.map((category) => (
                  <Link 
                    key={category.id}
                    to="/collections"
                    className="group relative overflow-hidden rounded-sm aspect-[4/5] block"
                  >
                    <img 
                      src={category.image_url || dressesImage}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
                      <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-2">
                        {category.name}
                      </h2>
                      <p className="text-sm mb-4 opacity-90">
                        {category.description || "Explore our collection"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Style Made Effortless
            </h2>
            <p className="text-muted-foreground mb-8">
              Each piece in our collection is thoughtfully designed to bring elegance to your everyday. 
              From flowing dresses to perfectly coordinated sets, discover fashion that moves with you 
              through every moment.
            </p>
            <Link 
              to="/collections"
              className="inline-block px-8 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Explore All Products
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Category;
