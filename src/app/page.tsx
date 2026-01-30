import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import styles from './page.module.css';

const categories = [
  {
    name: 'Blocks',
    href: '/blocks',
    emoji: '🧱',
    description: 'Crafting tables, furnaces, chests, and more',
    count: 22,
    color: '#7d7d7d',
  },
  {
    name: 'Items',
    href: '/items',
    emoji: '💎',
    description: 'Diamonds, ingots, materials, and resources',
    count: 23,
    color: '#4aedd9',
  },
  {
    name: 'Weapons & Tools',
    href: '/weapons-tools',
    emoji: '⚔️',
    description: 'Swords, pickaxes, bows, and equipment',
    count: 16,
    color: '#ff5555',
  },
  {
    name: 'Mobs',
    href: '/mobs',
    emoji: '🧟',
    description: 'Creatures, monsters, and bosses',
    count: 18,
    color: '#7a3030',
  },
  {
    name: 'Biomes',
    href: '/biomes',
    emoji: '🌲',
    description: 'Explore different worlds and dimensions',
    count: 18,
    color: '#7cbb4e',
  },
  {
    name: 'Potions',
    href: '/potions',
    emoji: '⚗️',
    description: 'Brewing recipes and effects',
    count: 15,
    color: '#3c6ef0',
  },
];

const featuredTips = [
  { emoji: '💡', tip: 'Press F3 to see debug information including coordinates' },
  { emoji: '🛡️', tip: 'Shields block 100% damage from Creeper explosions' },
  { emoji: '🔥', tip: 'Fire Resistance potion lets you swim in lava' },
  { emoji: '🐱', tip: 'Cats scare away Creepers and Phantoms' },
];

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleIcon}>⛏️</span>
            Minecraft Wiki
          </h1>
          <p className={styles.heroSubtitle}>
            Your comprehensive guide to blocks, items, mobs, biomes, and potions.
            <br />
            Complete with crafting recipes and brewing guides.
          </p>
          <div className={styles.searchContainer}>
            <SearchBar />
          </div>
        </div>
        <div className={styles.heroDecoration}>
          <span className={styles.floatingEmoji} style={{ animationDelay: '0s' }}>💎</span>
          <span className={styles.floatingEmoji} style={{ animationDelay: '0.5s' }}>⚔️</span>
          <span className={styles.floatingEmoji} style={{ animationDelay: '1s' }}>🧪</span>
          <span className={styles.floatingEmoji} style={{ animationDelay: '1.5s' }}>🏰</span>
        </div>
      </section>

      {/* Categories Grid */}
      <section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleBar}></span>
          Browse Categories
        </h2>
        <div className={styles.categoriesGrid}>
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} className={styles.categoryCard}>
              <div
                className={styles.categoryIcon}
                style={{ background: `linear-gradient(135deg, ${cat.color}40, ${cat.color}20)` }}
              >
                <span>{cat.emoji}</span>
              </div>
              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryName}>{cat.name}</h3>
                <p className={styles.categoryDesc}>{cat.description}</p>
                <span className={styles.categoryCount}>{cat.count} entries</span>
              </div>
              <span className={styles.categoryArrow}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className={styles.tipsSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleBar}></span>
          Quick Tips
        </h2>
        <div className={styles.tipsGrid}>
          {featuredTips.map((item, idx) => (
            <div key={idx} className={styles.tipCard}>
              <span className={styles.tipEmoji}>{item.emoji}</span>
              <p className={styles.tipText}>{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>112+</span>
          <span className={styles.statLabel}>Total Entries</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>6</span>
          <span className={styles.statLabel}>Categories</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>50+</span>
          <span className={styles.statLabel}>Crafting Recipes</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>15</span>
          <span className={styles.statLabel}>Brewing Recipes</span>
        </div>
      </section>
    </div>
  );
}
