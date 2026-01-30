import Link from 'next/link';
import { notFound } from 'next/navigation';
import mobsData from '@/data/mobs.json';
import styles from '@/app/detail.module.css';

interface PageProps {
    params: Promise<{ id: string }>;
}

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
    'Hostile': '💀',
    'Neutral': '🐺',
    'Passive': '🐄',
    'Boss': '👹',
};

export async function generateStaticParams() {
    return mobsData.mobs.map((mob) => ({
        id: mob.id,
    }));
}

export default async function MobDetailPage({ params }: PageProps) {
    const { id } = await params;
    const mob = mobsData.mobs.find(m => m.id === id);

    if (!mob) {
        notFound();
    }

    const emoji = categoryEmojis[mob.category] || '🧟';

    return (
        <div className={styles.container}>
            <Link href="/mobs" className={styles.backLink}>
                ← Back to Mobs
            </Link>

            <header className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.emoji}>{emoji}</span>
                </div>
                <div className={styles.titleArea}>
                    <h1 className={styles.title}>
                        {mob.name}
                        <span className={styles.badge}>{mob.category}</span>
                    </h1>
                    <p className={styles.description}>{mob.description}</p>
                </div>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>📊</span>
                    Stats
                </h2>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Health</div>
                        <div className={styles.statValue}>{mob.health}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Damage</div>
                        <div className={styles.statValue}>{mob.damage}</div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>🧠</span>
                    Behavior
                </h2>
                <p className={styles.description}>{mob.behavior}</p>
            </section>

            {mob.drops && mob.drops.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🎁</span>
                        Drops
                    </h2>
                    <div className={styles.list}>
                        {mob.drops.map((drop, idx) => (
                            <span key={idx} className={styles.listItem}>{drop}</span>
                        ))}
                    </div>
                </section>
            )}

            {mob.spawnBiomes && mob.spawnBiomes.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🌍</span>
                        Spawn Locations
                    </h2>
                    <div className={styles.list}>
                        {mob.spawnBiomes.map((biome, idx) => (
                            <span key={idx} className={styles.listItem}>{biome}</span>
                        ))}
                    </div>
                </section>
            )}

            {mob.tips && mob.tips.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>💡</span>
                        Tips
                    </h2>
                    <div className={styles.tipsList}>
                        {mob.tips.map((tip, idx) => (
                            <div key={idx} className={styles.tip}>
                                <span className={styles.tipIcon}>💡</span>
                                <p className={styles.tipText}>{tip}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
