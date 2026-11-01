import { useState, useEffect } from 'react';
import { X, ImageOff, Phone, ClipboardList, Check } from 'lucide-react';
import { categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import shopConfig from '../data/shopConfig';

export default function ProductModal({ product, onClose }) {
  const [imgError, setImgError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();
  const { lang, t } = useLanguage();

  const cat = categories.find(c => c.id === product.category);
  const categoryName = lang === 'en' ? (cat?.nameEn || '') : (cat?.name || '');
  const productName = lang === 'en' ? product.nameEn : product.name;
  const description = (lang === 'en' && product.descriptionEn) ? product.descriptionEn : product.description;
  const unit = (lang === 'en' && product.unitEn) ? product.unitEn : product.unit;

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
      const messageText = lang === 'en'
        ? `Hello,\nI would like to inquire about "${productName}" (current price & stock availability).\n\nThank you.`
        : `আসসালামু আলাইকুম,\nআমি "${product.name}" পণ্যটির দাম ও স্টক সম্পর্কে জানতে চাই।\n\nধন্যবাদ।`;
      const message = encodeURIComponent(messageText);
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
        <button type="button" className="modal-close" onClick={onClose} aria-label={t('close')}>
          <X size={20} />
        </button>

        <div className="modal-image">
          {!imgError ? (
            <img
              src={product.image}
              alt={productName}
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
          <h2>{productName}</h2>
          <p className="description">{description}</p>

          <div className="product-price">
            {product.price ? (
              <>
                <span className="price">৳{product.price.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}</span>
                <span className="unit">{unit}</span>
              </>
            ) : (
              <span className="contact-price" style={{ fontSize: '1rem' }}>
                {t('confirmPriceAtShop')}
              </span>
            )}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className={`btn ${isAdded ? 'btn-added' : 'btn-primary'}`}
              onClick={() => {
                addItem(product);
                setIsAdded(true);
                setTimeout(() => setIsAdded(false), 1500);
              }}
            >
              {isAdded ? (
                <>
                  <Check size={18} className="check-icon-anim" />
                  {t('addedToList')}
                </>
              ) : (
                <>
                  <ClipboardList size={18} />
                  {t('addToList')}
                </>
              )}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleContact}>
              <Phone size={18} />
              {t('contactForPrice')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
