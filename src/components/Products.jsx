import { useMemo } from 'react';
import { Search, X, SearchX } from 'lucide-react';
import products, { categories } from '../data/products';
import ProductCard from './ProductCard';
import Categories from './Categories';

export default function Products({
  searchQuery,
  activeCategory,
  sortOrder,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onViewDetails,
}) {
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortOrder === 'price-low') {
      result.sort((a, b) => {
        if (a.price === null) return 1;
        if (b.price === null) return 1;
        return a.price - b.price;
      });
    } else if (sortOrder === 'price-high') {
      result.sort((a, b) => {
        if (a.price === null) return 1;
        if (b.price === null) return 1;
        return b.price - a.price;
      });
    }

    return result;
  }, [searchQuery, activeCategory, sortOrder]);

  const activeCategoryName = activeCategory && activeCategory !== 'all'
    ? categories.find(c => c.id === activeCategory)?.name
    : null;

  const handleResetFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    onSortChange('default');
  };

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-header">
          <h2>আমাদের পণ্যসমূহ</h2>
          <p>আপনার প্রয়োজনীয় হার্ডওয়্যার পণ্য খুঁজে নিন সহজেই।</p>
        </div>

        {/* Categories Bar */}
        <Categories
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />

        {/* Toolbar */}
        <div className="products-toolbar">
          <div className="products-search">
            <Search size={18} style={{ color: '#9ba5b4', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="যেমন: সিমেন্ট, পাইপ, রং, হাতুড়ি..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="পণ্য সার্চ করুন"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                style={{ display: 'flex', color: '#9ba5b4' }}
                aria-label="সার্চ মুছুন"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="products-controls">
            {activeCategoryName && (
              <span className="filter-tag">
                {activeCategoryName}
                <button onClick={() => onCategoryChange('all')} aria-label="ক্যাটাগরি ফিল্টার মুছুন">
                  <X size={14} />
                </button>
              </span>
            )}

            <select
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="পণ্য সাজান"
            >
              <option value="default">সাজানোর ক্রম</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={48} />
            <h3>কোনো পণ্য পাওয়া যায়নি</h3>
            <p>আপনার সার্চ বা ফিল্টারের সাথে কোনো পণ্য মেলেনি। অন্য কিছু খুঁজে দেখুন।</p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              সব পণ্য দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
