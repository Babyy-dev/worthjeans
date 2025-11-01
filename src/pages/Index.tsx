import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewCollections from "@/components/NewCollections";
import CollectionSections from "@/components/CollectionSections";
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
        <NewCollections />
        <CollectionSections />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
