import {
  Building2, Cylinder, Paintbrush, Pipette, Zap, Cog,
  Lock, Wrench, Drill, Droplets, FlaskConical, Package
} from 'lucide-react';
import { categories } from '../data/products';

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
  return (
    <section className="section section-alt" id="categories">
      <div className="container">
        <div className="section-header">
          <h2>আমাদের পণ্যের ক্যাটাগরি</h2>
          <p>আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি বেছে নিন</p>
        </div>
        <div className="categories-grid">
          <div
            className={`category-card ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => onCategoryChange('all')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onCategoryChange('all')}
          >
            <div className="category-icon">
              <Package size={24} />
            </div>
            <h3>সব পণ্য</h3>
          </div>
          {categories.map(cat => {
            const Icon = iconMap[cat.icon] || Package;
            return (
              <div
                key={cat.id}
                className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onCategoryChange(cat.id)}
              >
                <div className="category-icon">
                  <Icon size={24} />
                </div>
                <h3>{cat.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
