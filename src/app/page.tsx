import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import blocksData from '@/data/blocks.json';
import itemsData from '@/data/items.json';
import mobsData from '@/data/mobs.json';
import biomesData from '@/data/biomes.json';
import potionsData from '@/data/potions.json';
import styles from './page.module.css';

const categories = [
  { id: 'blocks', name: 'Blocks', emoji: '🧱', href: '/blocks', desc: 'Crafting, utility, storage' },
  { id: 'items', name: 'Items', emoji: '💎', href: '/items', desc: 'Materials and resources' },
  { id: 'mobs', name: 'Mobs', emoji: '🧟', href: '/mobs', desc: 'Creatures and monsters' },
  { id: 'biomes', name: 'Biomes', emoji: '🌲', href: '/biomes', desc: 'World environments' },
  { id: 'potions', name: 'Potions', emoji: '🧪', href: '/potions', desc: 'Brewing and effects' },
];

export default function Home() {
  const totalEntries =
    blocksData.blocks.length +
    itemsData.items.length +
    mobsData.mobs.length +
    biomesData.biomes.length +
    potionsData.potions.length;

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Minecraft Wiki</h1>
        <p className={styles.subtitle}>
          Your comprehensive guide to blocks, items, mobs, biomes, and more
        </p>
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
      </header>

      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Browse Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map(cat => (
            <Link key={cat.id} href={cat.href} className={styles.categoryCard}>
              <span className={styles.categoryEmoji}>{cat.emoji}</span>
              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryName}>{cat.name}</h3>
                <p className={styles.categoryDesc}>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{blocksData.blocks.length}</span>
          <span className={styles.statLabel}>Blocks</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{itemsData.items.length}</span>
          <span className={styles.statLabel}>Items</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{mobsData.mobs.length}</span>
          <span className={styles.statLabel}>Mobs</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{biomesData.biomes.length}</span>
          <span className={styles.statLabel}>Biomes</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{totalEntries}</span>
          <span className={styles.statLabel}>Total Entries</span>
        </div>
      </section>
    </div>
  );
}
