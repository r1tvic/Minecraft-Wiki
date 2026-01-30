'use client';

import { useState, useMemo } from 'react';
import ItemCard from '@/components/ItemCard';
import biomesData from '@/data/biomes.json';
import styles from '../category.module.css';

export default function BiomesPage() {
    const [filter, setFilter] = useState<string>('All');

    const categories = useMemo(() => {
        const cats = new Set(biomesData.biomes.map(b => b.category));
        return ['All', ...Array.from(cats).sort()];
    }, []);

    const filteredBiomes = useMemo(() => {
        if (filter === 'All') return biomesData.biomes;
        return biomesData.biomes.filter(b => b.category === filter);
    }, [filter]);

    return (
        <div>
            <header className={styles.pageHeader}>
                <h1 className={styles.title}>
                    <span className={styles.titleEmoji}>🌲</span>
                    Biomes
                </h1>
                <p className={styles.subtitle}>
                    Explore different worlds, dimensions, and cave systems.
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
                {filteredBiomes.map(biome => (
                    <ItemCard
                        key={biome.id}
                        id={biome.id}
                        name={biome.name}
                        imageUrl={biome.imageUrl}
                        description={biome.description}
                        category={biome.category}
                        href={`/biomes/${biome.id}`}
                    />
                ))}
            </div>

            <p className={styles.count}>
                Showing {filteredBiomes.length} of {biomesData.biomes.length} biomes
            </p>
        </div>
    );
}
