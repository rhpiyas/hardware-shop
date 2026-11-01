import { useMemo } from 'react';
import { Search, X, SearchX, ArrowUpDown, ChevronDown } from 'lucide-react';
import products, { categories } from '../data/products';
import ProductCard from './ProductCard';
import Categories from './Categories';
import { useLanguage } from '../context/LanguageContext';

export default function Products({
  searchQuery,
  activeCategory,
  sortOrder,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onViewDetails,
}) {
  const { lang, t } = useLanguage();

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
        p.description.toLowerCase().includes(query) ||
        (p.descriptionEn && p.descriptionEn.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortOrder === 'price-low') {
      result.sort((a, b) => {
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      });
    } else if (sortOrder === 'price-high') {
      result.sort((a, b) => {
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      });
    }

    return result;
  }, [searchQuery, activeCategory, sortOrder]);

  const activeCategoryName = activeCategory && activeCategory !== 'all'
    ? (lang === 'en'
        ? categories.find(c => c.id === activeCategory)?.nameEn
        : categories.find(c => c.id === activeCategory)?.name)
    : null;

  const handleResetFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    onSortChange('default');
  };

  const countFormatted = filteredProducts.length.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US');

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-header">
          <h2>{t('productsTitle')}</h2>
          <p>{t('productsSubtitle')}</p>
        </div>

        {/* Categories Bar */}
        <Categories
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />

        {/* Toolbar */}
        <div className="products-toolbar">
          <div className="products-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={t('productsSearchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label={t('productsSearchPlaceholder')}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="search-clear-btn"
                aria-label={t('removeItem')}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="products-toolbar-right">
            <span className="products-count">
              {t('totalProducts', { count: countFormatted })}
            </span>

            {activeCategoryName && (
              <span className="filter-tag">
                {activeCategoryName}
                <button
                  type="button"
                  onClick={() => onCategoryChange('all')}
                  aria-label={t('removeItem')}
                >
                  <X size={13} />
                </button>
              </span>
            )}

            <div className="sort-select-wrapper">
              <ArrowUpDown size={16} className="sort-icon" />
              <select
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value)}
                aria-label={t('sortDefault')}
                className="sort-select"
              >
                <option value="default">{t('sortDefault')}</option>
                <option value="price-low">{t('sortPriceLow')}</option>
                <option value="price-high">{t('sortPriceHigh')}</option>
              </select>
              <ChevronDown size={15} className="sort-chevron" />
            </div>
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
            <h3>{t('noProductsFound')}</h3>
            <p>{t('noProductsDesc')}</p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              {t('viewAllProducts')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
