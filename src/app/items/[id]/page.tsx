import Link from 'next/link';
import { notFound } from 'next/navigation';
import itemsData from '@/data/items.json';
import styles from '@/app/detail.module.css';

interface PageProps {
    params: Promise<{ id: string }>;
}

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
    'Material': '💎',
    'Mob Drop': '🎁',
    'Treasure': '👑',
    'Food': '🍖',
    'Equipment': '🛡️',
    'Tool': '🔧',
    'Weapon': '⚔️',
    'Utility': '⚙️',
};

export async function generateStaticParams() {
    return itemsData.items.map((item) => ({
        id: item.id,
    }));
}

export default async function ItemDetailPage({ params }: PageProps) {
    const { id } = await params;
    const item = itemsData.items.find(i => i.id === id);

    if (!item) {
        notFound();
    }

    const emoji = categoryEmojis[item.category] || '💎';

    return (
        <div className={styles.container}>
            <Link href="/items" className={styles.backLink}>
                ← Back to Items
            </Link>

            <header className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.emoji}>{emoji}</span>
                </div>
                <div className={styles.titleArea}>
                    <h1 className={styles.title}>
                        {item.name}
                        <span className={styles.badge}>{item.category}</span>
                    </h1>
                    <p className={styles.description}>{item.description}</p>
                </div>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>📊</span>
                    Properties
                </h2>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Stack Size</div>
                        <div className={styles.statValue}>{item.stackSize}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Renewable</div>
                        <div className={styles.statValue}>{item.renewable ? 'Yes' : 'No'}</div>
                    </div>
                </div>
            </section>

            {item.obtainedFrom && item.obtainedFrom.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>📍</span>
                        How to Obtain
                    </h2>
                    <div className={styles.list}>
                        {item.obtainedFrom.map((source, idx) => (
                            <span key={idx} className={styles.listItem}>{source}</span>
                        ))}
                    </div>
                </section>
            )}

            {item.uses && item.uses.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>⚒️</span>
                        Uses
                    </h2>
                    <div className={styles.list}>
                        {item.uses.map((use, idx) => (
                            <span key={idx} className={styles.listItem}>{use}</span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
