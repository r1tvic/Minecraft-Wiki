'use client';

import { useState, useMemo } from 'react';
import ItemCard from '@/components/ItemCard';
import itemsData from '@/data/items.json';
import styles from '../category.module.css';

export default function ItemsPage() {
    const [filter, setFilter] = useState<string>('All');

    const categories = useMemo(() => {
        const cats = new Set(itemsData.items.map(i => i.category));
        return ['All', ...Array.from(cats).sort()];
    }, []);

    const filteredItems = useMemo(() => {
        if (filter === 'All') return itemsData.items;
        return itemsData.items.filter(i => i.category === filter);
    }, [filter]);

    return (
        <div>
            <header className={styles.pageHeader}>
                <h1 className={styles.title}>
                    <span className={styles.titleEmoji}>💎</span>
                    Items
                </h1>
                <p className={styles.subtitle}>
                    Materials, resources, mob drops, and crafted items.
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
                        emoji={item.emoji}
                        description={item.description}
                        category={item.category}
                        href={`/items/${item.id}`}
                    />
                ))}
            </div>

            <p className={styles.count}>
                Showing {filteredItems.length} of {itemsData.items.length} items
            </p>
        </div>
    );
}
