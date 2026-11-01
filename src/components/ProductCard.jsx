import { useState, useCallback } from 'react';
import { ImageOff, ClipboardList } from 'lucide-react';
import { categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ product, onViewDetails }) {
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();
  const { lang, t } = useLanguage();

  const cat = categories.find(c => c.id === product.category);
  const categoryName = lang === 'en' ? (cat?.nameEn || '') : (cat?.name || '');
  const productName = lang === 'en' ? product.nameEn : product.name;
  const description = (lang === 'en' && product.descriptionEn) ? product.descriptionEn : product.description;
  const unit = (lang === 'en' && product.unitEn) ? product.unitEn : product.unit;

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    addItem(product);
  }, [product, addItem]);

  return (
    <div className="product-card" onClick={() => onViewDetails(product)}>
      <div className="product-image-wrap">
        {!imgError ? (
          <img
            src={product.image}
            alt={productName}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="product-image-fallback">
            <ImageOff size={40} />
          </div>
        )}
        <span className="product-category-badge">{categoryName}</span>
      </div>
      <div className="product-info">
        <h3>{productName}</h3>
        <p className="description">{description}</p>
        <div className="product-price">
          {product.price ? (
            <>
              <span className="price">৳{product.price.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}</span>
              <span className="unit">{unit}</span>
            </>
          ) : (
            <span className="contact-price">{t('contactForPrice')}</span>
          )}
        </div>
        <div className="product-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
          >
            <ClipboardList size={14} style={{ marginRight: '0.25rem', flexShrink: 0 }} />
            {t('addToList')}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
          >
            {t('details')}
          </button>
        </div>
      </div>
    </div>
  );
}
