'use client';

import { useState, useMemo } from 'react';
import ItemCard from '@/components/ItemCard';
import mobsData from '@/data/mobs.json';
import styles from '../category.module.css';

export default function MobsPage() {
    const [filter, setFilter] = useState<string>('All');

    const categories = useMemo(() => {
        const cats = new Set(mobsData.mobs.map(m => m.category));
        return ['All', ...Array.from(cats).sort()];
    }, []);

    const filteredMobs = useMemo(() => {
        if (filter === 'All') return mobsData.mobs;
        return mobsData.mobs.filter(m => m.category === filter);
    }, [filter]);

    return (
        <div>
            <header className={styles.pageHeader}>
                <h1 className={styles.title}>
                    <span className={styles.titleEmoji}>🧟</span>
                    Mobs
                </h1>
                <p className={styles.subtitle}>
                    Hostile monsters, neutral creatures, passive animals, and bosses.
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
                {filteredMobs.map(mob => (
                    <ItemCard
                        key={mob.id}
                        id={mob.id}
                        name={mob.name}
                        emoji={mob.emoji}
                        description={mob.description}
                        category={mob.category}
                        href={`/mobs/${mob.id}`}
                        badge={mob.category === 'Boss' ? '⚠️ BOSS' : undefined}
                    />
                ))}
            </div>

            <p className={styles.count}>
                Showing {filteredMobs.length} of {mobsData.mobs.length} mobs
            </p>
        </div>
    );
}
