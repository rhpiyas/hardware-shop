import {
  Building2, Cylinder, Paintbrush, Pipette, Zap, Cog,
  Lock, Wrench, Drill, Droplets, FlaskConical, Package
} from 'lucide-react';
import { categories } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  building: Building2,
  cylinder: Cylinder,
  paintbrush: Paintbrush,
  pipette: Pipette,
  zap: Zap,
  cog: Cog,
  lock: Lock,
  wrench: Wrench,
  drill: Drill,
  droplets: Droplets,
  flask: FlaskConical,
  package: Package,
};

export default function Categories({ activeCategory, onCategoryChange }) {
  const { lang, t } = useLanguage();

  return (
    <div className="categories-bar" id="categories" role="tablist" aria-label={t('productCategories')}>
      <button
        type="button"
        role="tab"
        aria-selected={activeCategory === 'all'}
        className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        <Package size={17} className="category-pill-icon" />
        <span>{t('allCategories')}</span>
      </button>
      {categories.map(cat => {
        const Icon = iconMap[cat.icon] || Package;
        const isActive = activeCategory === cat.id;
        const categoryName = lang === 'en' ? cat.nameEn : cat.name;

        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`category-pill ${isActive ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            <Icon size={17} className="category-pill-icon" />
            <span>{categoryName}</span>
          </button>
        );
      })}
    </div>
  );
}
