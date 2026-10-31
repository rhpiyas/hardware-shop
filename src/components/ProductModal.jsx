import { useState, useEffect } from 'react';
import { X, ImageOff, Phone, ShoppingCart } from 'lucide-react';
import { categories } from '../data/products';
import { useCart } from '../context/CartContext';
import shopConfig from '../data/shopConfig';

export default function ProductModal({ product, onClose }) {
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  const categoryName = categories.find(c => c.id === product.category)?.name || '';

  // Close on escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleContact = () => {
    if (shopConfig.whatsapp) {
      const message = encodeURIComponent(
        `আসসালামু আলাইকুম,\nআমি "${product.name}" পণ্যটির দাম ও স্টক সম্পর্কে জানতে চাই।\n\nধন্যবাদ।`
      );
      window.open(`https://wa.me/${shopConfig.whatsapp.replace('+', '')}?text=${message}`, '_blank');
    } else {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="বন্ধ করুন">
          <X size={20} />
        </button>

        <div className="modal-image">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="product-image-fallback" style={{ aspectRatio: '16/10' }}>
              <ImageOff size={60} />
            </div>
          )}
        </div>

        <div className="modal-body">
          <span className="product-category-badge">{categoryName}</span>
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>

          <div className="product-price">
            {product.price ? (
              <>
                <span className="price">৳{product.price.toLocaleString('bn-BD')}</span>
                <span className="unit">{product.unit}</span>
              </>
            ) : (
              <span className="contact-price" style={{ fontSize: '1rem' }}>
                দাম নিশ্চিত করতে দোকানে যোগাযোগ করুন
              </span>
            )}
          </div>

          <div className="modal-actions">
            <button className="btn btn-primary" onClick={() => { addItem(product); }}>
              <ShoppingCart size={18} />
              তালিকায় যোগ করুন
            </button>
            <button className="btn btn-secondary" onClick={handleContact}>
              <Phone size={18} />
              দাম জানতে যোগাযোগ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
