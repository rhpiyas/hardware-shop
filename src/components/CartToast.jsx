import { Check, X, ClipboardList } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function CartToast() {
  const { toast, closeToast, setIsOpen } = useCart();
  const { lang, t } = useLanguage();

  if (!toast) return null;

  const productName = lang === 'en' ? (toast.nameEn || toast.name) : toast.name;

  return (
    <aside className="cart-toast" role="status" aria-live="polite">
      <div className="cart-toast-content">
        <div className="cart-toast-thumb">
          {toast.image ? (
            <img
              src={toast.image}
              alt={productName}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <ClipboardList size={20} className="toast-check-icon" />
          )}
        </div>

        <div className="cart-toast-info">
          <span className="cart-toast-name">{productName}</span>
          <div className="cart-toast-msg">
            <Check size={14} className="toast-inline-check" />
            <span>{t('addedToCartNotification')}</span>
          </div>
        </div>

        <button
          type="button"
          className="cart-toast-view-btn"
          onClick={() => {
            closeToast();
            setIsOpen(true);
          }}
        >
          {t('viewList')}
        </button>

        <button
          type="button"
          className="cart-toast-close"
          onClick={closeToast}
          aria-label={t('close')}
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}

