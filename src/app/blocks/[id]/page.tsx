import Link from 'next/link';
import { notFound } from 'next/navigation';
import blocksData from '@/data/blocks.json';
import styles from '@/app/detail.module.css';

interface PageProps {
    params: Promise<{ id: string }>;
}

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
    'Utility': '⚙️',
    'Storage': '📦',
    'Building': '🧱',
    'Redstone': '🔴',
    'Decoration': '🎨',
};

export async function generateStaticParams() {
    return blocksData.blocks.map((block) => ({
        id: block.id,
    }));
}

export default async function BlockDetailPage({ params }: PageProps) {
    const { id } = await params;
    const block = blocksData.blocks.find(b => b.id === id);

    if (!block) {
        notFound();
    }

    const emoji = categoryEmojis[block.category] || '🧱';

    return (
        <div className={styles.container}>
            <Link href="/blocks" className={styles.backLink}>
                ← Back to Blocks
            </Link>

            <header className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.emoji}>{emoji}</span>
                </div>
                <div className={styles.titleArea}>
                    <h1 className={styles.title}>
                        {block.name}
                        <span className={styles.badge}>{block.category}</span>
                    </h1>
                    <p className={styles.description}>{block.description}</p>
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
                        <div className={styles.statValue}>{block.stackSize}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Hardness</div>
                        <div className={styles.statValue}>{block.hardness}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Blast Resistance</div>
                        <div className={styles.statValue}>{block.blastResistance}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Tool</div>
                        <div className={styles.statValue}>{block.tool}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Renewable</div>
                        <div className={styles.statValue}>{block.renewable ? 'Yes' : 'No'}</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
