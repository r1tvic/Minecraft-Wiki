'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './ItemCard.module.css';

interface ItemCardProps {
    id: string;
    name: string;
    description: string;
    category: string;
    href: string;
    badge?: string;
    imageUrl?: string;
}

// Category emoji fallbacks
const categoryEmojis: Record<string, string> = {
    // Blocks
    'Utility': '⚙️',
    'Storage': '📦',
    'Building': '🧱',
    'Redstone': '🔴',
    'Decoration': '🎨',
    'Natural': '🌿',
    // Items
    'Material': '💎',
    'Mob Drop': '🎁',
    'Treasure': '👑',
    'Food': '🍖',
    'Equipment': '🛡️',
    'Tool': '🔧',
    'Weapon': '⚔️',
    // Mobs
    'Hostile': '💀',
    'Neutral': '🐺',
    'Passive': '🐄',
    'Boss': '👹',
    // Biomes
    'Overworld': '🌍',
    'Nether': '🔥',
    'End': '🌌',
    'Cave': '🕳️',
    // Potions
    'Positive': '💚',
    'Negative': '💔',
    'Mixed': '💜',
};

function getCategoryEmoji(category: string): string {
    return categoryEmojis[category] || '📦';
}

export default function ItemCard({
    id,
    name,
    description,
    category,
    href,
    badge,
    imageUrl
}: ItemCardProps) {
    const [imageError, setImageError] = useState(false);

    // Use emoji fallback if no image or image fails to load
    const showEmoji = !imageUrl || imageError;

    return (
        <Link href={href} className={styles.card}>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    {showEmoji ? (
                        <span className={styles.emoji}>{getCategoryEmoji(category)}</span>
                    ) : (
                        <img
                            src={imageUrl}
                            alt={name}
                            className={styles.itemImage}
                            onError={() => setImageError(true)}
                            loading="lazy"
                        />
                    )}
                </div>
                {badge && <span className={styles.badge}>{badge}</span>}
            </div>

            <div className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <span className={styles.category}>{category}</span>
                <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.footer}>
                <span className={styles.viewMore}>View details →</span>
            </div>
        </Link>
    );
}
