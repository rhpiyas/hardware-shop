import { useState, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Products from './components/Products';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import CartToast from './components/CartToast';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import StoreInfo from './components/StoreInfo';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    // If user searches, scroll to products
    if (query) {
      const el = document.querySelector('#products');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <Header onSearch={handleSearch} />
          <main>
            <Hero />
            <Highlights />
            <Products
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              sortOrder={sortOrder}
              onSearchChange={setSearchQuery}
              onCategoryChange={setActiveCategory}
              onSortChange={setSortOrder}
              onViewDetails={setSelectedProduct}
            />
            <About />
            <WhyChooseUs />
            <StoreInfo />
            <Contact />
          </main>
          <Footer />

          {/* Overlays */}
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
          <CartSidebar />
          <CartToast />
          <ScrollToTop />
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
