import Link from 'next/link';
import styles from './ItemCard.module.css';

interface ItemCardProps {
    id: string;
    name: string;
    emoji: string;
    description: string;
    category: string;
    href: string;
    badge?: string;
}

export default function ItemCard({
    id,
    name,
    emoji,
    description,
    category,
    href,
    badge
}: ItemCardProps) {
    const categoryClass = `badge-${category.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <Link href={href} className={styles.card}>
            <div className={styles.header}>
                <span className={styles.emoji}>{emoji}</span>
                {badge && <span className={styles.badge}>{badge}</span>}
            </div>

            <div className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <span className={`${styles.category} ${categoryClass}`}>{category}</span>
                <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.footer}>
                <span className={styles.viewMore}>View Details →</span>
            </div>
        </Link>
    );
}
