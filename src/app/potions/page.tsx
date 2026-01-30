'use client';

import { useState, useMemo } from 'react';
import ItemCard from '@/components/ItemCard';
import potionsData from '@/data/potions.json';
import styles from '../category.module.css';

export default function PotionsPage() {
    const [filter, setFilter] = useState<string>('All');

    const categories = useMemo(() => {
        const cats = new Set(potionsData.potions.map(p => p.category));
        return ['All', ...Array.from(cats).sort()];
    }, []);

    const filteredPotions = useMemo(() => {
        if (filter === 'All') return potionsData.potions;
        return potionsData.potions.filter(p => p.category === filter);
    }, [filter]);

    return (
        <div>
            <header className={styles.pageHeader}>
                <h1 className={styles.title}>
                    <span className={styles.titleEmoji}>🧪</span>
                    Potions
                </h1>
                <p className={styles.subtitle}>
                    Brewing recipes, effects, and alchemical formulas.
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
                {filteredPotions.map(potion => (
                    <ItemCard
                        key={potion.id}
                        id={potion.id}
                        name={potion.name}
                        description={potion.description}
                        category={potion.category}
                        href={`/potions/${potion.id}`}
                        badge={potion.duration || undefined}
                    />
                ))}
            </div>

            <p className={styles.count}>
                Showing {filteredPotions.length} of {potionsData.potions.length} potions
            </p>
        </div>
    );
}
