'use client';

import { useState, useMemo } from 'react';
import ItemCard from '@/components/ItemCard';
import weaponsData from '@/data/weapons-tools.json';
import styles from '../category.module.css';

export default function WeaponsToolsPage() {
    const [filter, setFilter] = useState<string>('All');

    const categories = useMemo(() => {
        const cats = new Set(weaponsData.weapons_and_tools.map(w => w.category));
        return ['All', ...Array.from(cats).sort()];
    }, []);

    const filteredItems = useMemo(() => {
        if (filter === 'All') return weaponsData.weapons_and_tools;
        return weaponsData.weapons_and_tools.filter(w => w.category === filter);
    }, [filter]);

    return (
        <div>
            <header className={styles.pageHeader}>
                <h1 className={styles.title}>
                    <span className={styles.titleEmoji}>⚔️</span>
                    Weapons & Tools
                </h1>
                <p className={styles.subtitle}>
                    Swords, pickaxes, bows, and essential equipment for survival.
                </p>
            </header>

            <div className={styles.filters}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredItems.map(item => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        category={item.category}
                        href={`/weapons-tools/${item.id}`}
                    />
                ))}
            </div>

            <p className={styles.count}>
                Showing {filteredItems.length} of {weaponsData.weapons_and_tools.length} weapons & tools
            </p>
        </div>
    );
}
