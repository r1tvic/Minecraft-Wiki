'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

const categories = [
  { name: 'Home', path: '/', emoji: '🏠' },
  { name: 'Blocks', path: '/blocks', emoji: '🧱' },
  { name: 'Items', path: '/items', emoji: '💎' },
  { name: 'Weapons & Tools', path: '/weapons-tools', emoji: '⚔️' },
  { name: 'Mobs', path: '/mobs', emoji: '🧟' },
  { name: 'Biomes', path: '/biomes', emoji: '🌲' },
  { name: 'Potions', path: '/potions', emoji: '⚗️' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⛏️</span>
          <span className={styles.logoText}>Minecraft Wiki</span>
        </div>
        
        <ul className={styles.navList}>
          {categories.map((cat) => (
            <li key={cat.path}>
              <Link
                href={cat.path}
                className={`${styles.navLink} ${pathname === cat.path ? styles.active : ''}`}
              >
                <span className={styles.navEmoji}>{cat.emoji}</span>
                <span className={styles.navText}>{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <p>Made with ❤️</p>
          <p>Not affiliated with Mojang</p>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className={styles.mobileHeader}>
        <div className={styles.mobileLogoContainer}>
          <span className={styles.logoIcon}>⛏️</span>
          <span className={styles.logoText}>MC Wiki</span>
        </div>
        <button 
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.open : ''}`}></span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileMenuOpen(false)}>
          <nav className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <ul className={styles.mobileNavList}>
              {categories.map((cat) => (
                <li key={cat.path}>
                  <Link
                    href={cat.path}
                    className={`${styles.mobileNavLink} ${pathname === cat.path ? styles.active : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={styles.navEmoji}>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
