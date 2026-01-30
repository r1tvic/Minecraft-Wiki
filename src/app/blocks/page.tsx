'use client';

import { useState, useMemo } from 'react';
import ItemCard from '@/components/ItemCard';
import blocksData from '@/data/blocks.json';
import styles from '../category.module.css';

export default function BlocksPage() {
    const [filter, setFilter] = useState<string>('All');

    const categories = useMemo(() => {
        const cats = new Set(blocksData.blocks.map(b => b.category));
        return ['All', ...Array.from(cats).sort()];
    }, []);

    const filteredBlocks = useMemo(() => {
        if (filter === 'All') return blocksData.blocks;
        return blocksData.blocks.filter(b => b.category === filter);
    }, [filter]);

    return (
        <div>
            <header className={styles.pageHeader}>
                <h1 className={styles.title}>
                    <span className={styles.titleEmoji}>🧱</span>
                    Blocks
                </h1>
                <p className={styles.subtitle}>
                    Crafting tables, furnaces, storage, redstone components, and more.
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
                {filteredBlocks.map(block => (
                    <ItemCard
                        key={block.id}
                        id={block.id}
                        name={block.name}
                        imageUrl={block.imageUrl}
                        description={block.description}
                        category={block.category}
                        href={`/blocks/${block.id}`}
                    />
                ))}
            </div>

            <p className={styles.count}>
                Showing {filteredBlocks.length} of {blocksData.blocks.length} blocks
            </p>
        </div>
    );
}
