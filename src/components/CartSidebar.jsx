import { X, Plus, Minus, Trash2, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import shopConfig from '../data/shopConfig';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart, totalItems } = useCart();

  const generateWhatsAppMessage = () => {
    let message = `আসসালামু আলাইকুম,\n\nআমি নিচের পণ্যগুলো সম্পর্কে জানতে চাই:\n\n`;
    items.forEach((item, i) => {
      message += `${i + 1}. ${item.name} — পরিমাণ: ${item.quantity}`;
      if (item.price) {
        message += ` (৳${item.price} ${item.unit})`;
      }
      message += `\n`;
    });
    message += `\nদয়া করে দাম ও স্টক সম্পর্কে জানাবেন। ধন্যবাদ।`;
    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    if (!shopConfig.whatsapp) return;
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${shopConfig.whatsapp.replace('+', '')}?text=${message}`, '_blank');
  };

  const isWhatsAppConfigured = !!shopConfig.whatsapp;

  return (
    <>
      <div
        className={`cart-sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h3>📋 পণ্যের তালিকা ({totalItems})</h3>
          <button onClick={() => setIsOpen(false)} aria-label="বন্ধ করুন">
            <X size={24} />
          </button>
        </div>

        <div className="cart-sidebar-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={48} />
              <h3 style={{ marginTop: '1rem', color: '#374151' }}>তালিকা খালি</h3>
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                পণ্য যোগ করতে &quot;তালিকায় যোগ করুন&quot; বাটনে ক্লিক করুন
              </p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span className="cart-item-price">
                    {item.price
                      ? `৳${item.price.toLocaleString('bn-BD')} ${item.unit}`
                      : 'দাম জানতে যোগাযোগ করুন'
                    }
                  </span>
                  <div className="cart-item-qty">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="পরিমাণ কমান"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="পরিমাণ বাড়ান"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label="মুছে ফেলুন"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-sidebar-footer">
            <button
              className={`btn ${isWhatsAppConfigured ? 'whatsapp-btn' : 'whatsapp-disabled'}`}
              onClick={handleWhatsApp}
              disabled={!isWhatsAppConfigured}
              title={!isWhatsAppConfigured ? 'WhatsApp নম্বর এখনো কনফিগার করা হয়নি' : ''}
            >
              <MessageCircle size={18} />
              {isWhatsAppConfigured
                ? 'WhatsApp-এ পাঠান'
                : 'WhatsApp নম্বর যোগ করুন (কনফিগ)'
              }
            </button>
            <button
              className="btn btn-secondary"
              onClick={clearCart}
              style={{ width: '100%', fontSize: '0.875rem' }}
            >
              <Trash2 size={16} />
              তালিকা খালি করুন
            </button>
          </div>
        )}
      </div>
    </>
  );
}
