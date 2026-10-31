import { useState, useCallback } from 'react';
import { ImageOff } from 'lucide-react';
import { categories } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onViewDetails }) {
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  const categoryName = categories.find(c => c.id === product.category)?.name || '';

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
            alt={product.name}
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
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="product-price">
          {product.price ? (
            <>
              <span className="price">৳{product.price.toLocaleString('bn-BD')}</span>
              <span className="unit">{product.unit}</span>
            </>
          ) : (
            <span className="contact-price">দাম জানতে যোগাযোগ করুন</span>
          )}
        </div>
        <div className="product-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
          >
            তালিকায় যোগ করুন
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
          >
            বিস্তারিত
          </button>
        </div>
      </div>
    </div>
  );
}
