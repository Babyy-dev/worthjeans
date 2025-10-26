import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryShowcase from "@/components/CategoryShowcase";
import BestSellers from "@/components/BestSellers";
import Footer from "@/components/Footer";
import { SalePopup } from "@/components/SalePopup";
import { FloatingButtons } from "@/components/FloatingButtons";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SalePopup />
      <Navbar />
      <main>
        <Hero />
        <CategoryShowcase />
        <BestSellers />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
