import { X, Plus, Minus, Trash2, ClipboardList, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import shopConfig from '../data/shopConfig';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart, totalItems } = useCart();
  const { lang, t } = useLanguage();

  const generateWhatsAppMessage = () => {
    const isEn = lang === 'en';
    const shopName = isEn ? shopConfig.nameEn : shopConfig.name;

    if (isEn) {
      let message = `Hello,\n\nI would like to inquire about the following products from ${shopName}:\n\n`;
      items.forEach((item, i) => {
        const name = item.nameEn || item.name;
        const unit = item.unitEn || item.unit;
        message += `${i + 1}. ${name} — Quantity: ${item.quantity}`;
        if (item.price) {
          message += ` (৳${item.price.toLocaleString('en-US')} ${unit})`;
        }
        message += `\n`;
      });
      message += `\nPlease let me know the confirmed prices and stock availability. Thank you.`;
      return encodeURIComponent(message);
    } else {
      let message = `আসসালামু আলাইকুম,\n\nআমি নিচের পণ্যগুলো সম্পর্কে জানতে চাই:\n\n`;
      items.forEach((item, i) => {
        message += `${i + 1}. ${item.name} — পরিমাণ: ${item.quantity}`;
        if (item.price) {
          message += ` (৳${item.price.toLocaleString('bn-BD')} ${item.unit})`;
        }
        message += `\n`;
      });
      message += `\nদয়া করে দাম ও স্টক সম্পর্কে জানাবেন। ধন্যবাদ।`;
      return encodeURIComponent(message);
    }
  };

  const handleWhatsApp = () => {
    if (!shopConfig.whatsapp) return;
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${shopConfig.whatsapp.replace('+', '')}?text=${message}`, '_blank');
  };

  const isWhatsAppConfigured = !!shopConfig.whatsapp;
  const itemsCountFormatted = totalItems.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US');

  return (
    <>
      <div
        className={`cart-sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h3>📋 {t('cartTitle')} ({itemsCountFormatted})</h3>
          <button type="button" onClick={() => setIsOpen(false)} aria-label={t('close')}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-sidebar-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ClipboardList size={48} />
              <h3 style={{ marginTop: '1rem', color: '#374151' }}>{t('cartEmptyTitle')}</h3>
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                {t('cartEmptyDesc')}
              </p>
            </div>
          ) : (
            items.map(item => {
              const itemName = lang === 'en' ? (item.nameEn || item.name) : item.name;
              const itemUnit = (lang === 'en' && item.unitEn) ? item.unitEn : item.unit;
              const formattedPrice = item.price
                ? `৳${item.price.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')} ${itemUnit}`
                : t('contactForPrice');

              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img
                      src={item.image}
                      alt={itemName}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.parentElement) {
                          e.target.parentElement.classList.add('cart-item-image-fallback');
                        }
                      }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <h4>{itemName}</h4>
                    <span className="cart-item-price">
                      {formattedPrice}
                    </span>
                    <div className="cart-item-qty">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={t('decreaseQty')}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={t('increaseQty')}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={t('removeItem')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-sidebar-footer">
            <button
              type="button"
              className={`btn ${isWhatsAppConfigured ? 'whatsapp-btn' : 'whatsapp-disabled'}`}
              onClick={handleWhatsApp}
              disabled={!isWhatsAppConfigured}
              title={!isWhatsAppConfigured ? (lang === 'en' ? 'WhatsApp number not configured' : 'WhatsApp নম্বর এখনো কনফিগার করা হয়নি') : ''}
            >
              <MessageCircle size={18} />
              {isWhatsAppConfigured
                ? t('sendWhatsApp')
                : t('addWhatsAppConfig')
              }
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearCart}
              style={{ width: '100%', fontSize: '0.875rem' }}
            >
              <Trash2 size={16} />
              {t('clearList')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
