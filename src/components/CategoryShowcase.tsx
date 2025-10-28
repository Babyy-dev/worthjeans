import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dressesImage from "@/assets/category-dresses.jpg";
import coordsImage from "@/assets/category-coords.jpg";
import { api } from "@/lib/api";

const CategoryShowcase = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get('/categories');
        setCategories((data || []).slice(0, 2));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const defaultImages = [dressesImage, coordsImage];

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
          Discover Your Style
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Élégance brings together dresses and co-ords that make style effortless yet refined. 
          From timeless silhouettes that flatter in every setting to perfectly paired sets that 
          balance ease with chic, each piece is designed to move with you.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Link key={category.id} to="/collections" className="group cursor-pointer overflow-hidden rounded-sm">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={category.image_url || defaultImages[index % 2]}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-3xl font-serif font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {category.description || "Explore our collection"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <>
            <Link to="/collections" className="group cursor-pointer overflow-hidden rounded-sm">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={dressesImage}
                  alt="Elegant women's dresses collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-3xl font-serif font-semibold mb-2">Dresses</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Timeless silhouettes for every occasion
                  </p>
                </div>
              </div>
            </Link>
            
            <Link to="/collections" className="group cursor-pointer overflow-hidden rounded-sm">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={coordsImage}
                  alt="Premium women's co-ord sets and matching outfits"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-3xl font-serif font-semibold mb-2">Co-ords & Sets</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Perfectly paired for effortless style
                  </p>
                </div>
              </div>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryShowcase;
