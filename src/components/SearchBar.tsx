'use client';

import { useState, useMemo, useCallback } from 'react';
import styles from './SearchBar.module.css';

// Import data
import blocksData from '@/data/blocks.json';
import itemsData from '@/data/items.json';
import weaponsToolsData from '@/data/weapons-tools.json';
import mobsData from '@/data/mobs.json';
import biomesData from '@/data/biomes.json';
import potionsData from '@/data/potions.json';

interface SearchResult {
    id: string;
    name: string;
    emoji: string;
    category: string;
    type: 'blocks' | 'items' | 'weapons-tools' | 'mobs' | 'biomes' | 'potions';
}

interface SearchBarProps {
    onResultClick?: (result: SearchResult) => void;
}

export default function SearchBar({ onResultClick }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Combine all data into searchable format
    const allItems = useMemo(() => {
        const items: SearchResult[] = [];

        blocksData.blocks.forEach(b => items.push({
            id: b.id, name: b.name, emoji: b.emoji, category: b.category, type: 'blocks'
        }));

        itemsData.items.forEach(i => items.push({
            id: i.id, name: i.name, emoji: i.emoji, category: i.category, type: 'items'
        }));

        weaponsToolsData.weapons_and_tools.forEach(w => items.push({
            id: w.id, name: w.name, emoji: w.emoji, category: w.category, type: 'weapons-tools'
        }));

        mobsData.mobs.forEach(m => items.push({
            id: m.id, name: m.name, emoji: m.emoji, category: m.category, type: 'mobs'
        }));

        biomesData.biomes.forEach(b => items.push({
            id: b.id, name: b.name, emoji: b.emoji, category: b.category, type: 'biomes'
        }));

        potionsData.potions.forEach(p => items.push({
            id: p.id, name: p.name, emoji: p.emoji, category: p.category, type: 'potions'
        }));

        return items;
    }, []);

    const results = useMemo(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();
        return allItems
            .filter(item =>
                item.name.toLowerCase().includes(lowerQuery) ||
                item.category.toLowerCase().includes(lowerQuery)
            )
            .slice(0, 8);
    }, [query, allItems]);

    const handleResultClick = useCallback((result: SearchResult) => {
        setQuery('');
        setIsFocused(false);
        if (onResultClick) {
            onResultClick(result);
        } else {
            // Default navigation
            window.location.href = `/${result.type}/${result.id}`;
        }
    }, [onResultClick]);

    const typeLabels: Record<string, string> = {
        'blocks': 'Block',
        'items': 'Item',
        'weapons-tools': 'Weapon/Tool',
        'mobs': 'Mob',
        'biomes': 'Biome',
        'potions': 'Potion',
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.searchWrapper} ${isFocused ? styles.focused : ''}`}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Search blocks, items, mobs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
                {query && (
                    <button
                        className={styles.clearBtn}
                        onClick={() => setQuery('')}
                        type="button"
                    >
                        ✕
                    </button>
                )}
            </div>

            {isFocused && results.length > 0 && (
                <div className={styles.dropdown}>
                    {results.map((result) => (
                        <button
                            key={`${result.type}-${result.id}`}
                            className={styles.resultItem}
                            onClick={() => handleResultClick(result)}
                        >
                            <span className={styles.resultEmoji}>{result.emoji}</span>
                            <div className={styles.resultInfo}>
                                <span className={styles.resultName}>{result.name}</span>
                                <span className={styles.resultType}>{typeLabels[result.type]}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {isFocused && query && results.length === 0 && (
                <div className={styles.dropdown}>
                    <div className={styles.noResults}>
                        <span>😕</span>
                        <span>No results found for &quot;{query}&quot;</span>
                    </div>
                </div>
            )}
        </div>
    );
}
