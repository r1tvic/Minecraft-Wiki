import Link from 'next/link';
import { notFound } from 'next/navigation';
import biomesData from '@/data/biomes.json';
import styles from '../../detail.module.css';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return biomesData.biomes.map((biome) => ({
        id: biome.id,
    }));
}

export default async function BiomeDetailPage({ params }: PageProps) {
    const { id } = await params;
    const biome = biomesData.biomes.find(b => b.id === id);

    if (!biome) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <Link href="/biomes" className={styles.backLink}>
                ← Back to Biomes
            </Link>

            <header className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.emoji}>{biome.emoji}</span>
                </div>
                <div className={styles.titleArea}>
                    <h1 className={styles.title}>
                        {biome.name}
                        <span className={styles.badge}>{biome.category}</span>
                    </h1>
                    <p className={styles.description}>{biome.description}</p>
                </div>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>🌡️</span>
                    Climate
                </h2>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Temperature</div>
                        <div className={styles.statValue}>{biome.temperature}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Category</div>
                        <div className={styles.statValue}>{biome.category}</div>
                    </div>
                </div>
            </section>

            {biome.structures && biome.structures.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🏛️</span>
                        Structures
                    </h2>
                    <div className={styles.list}>
                        {biome.structures.map((structure, idx) => (
                            <span key={idx} className={styles.listItem}>{structure}</span>
                        ))}
                    </div>
                </section>
            )}

            {biome.mobs && biome.mobs.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🦎</span>
                        Mobs
                    </h2>
                    <div className={styles.list}>
                        {biome.mobs.map((mob, idx) => (
                            <span key={idx} className={styles.listItem}>{mob}</span>
                        ))}
                    </div>
                </section>
            )}

            {biome.resources && biome.resources.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>💎</span>
                        Resources
                    </h2>
                    <div className={styles.list}>
                        {biome.resources.map((resource, idx) => (
                            <span key={idx} className={styles.listItem}>{resource}</span>
                        ))}
                    </div>
                </section>
            )}

            {biome.variants && biome.variants.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🔄</span>
                        Variants
                    </h2>
                    <div className={styles.list}>
                        {biome.variants.map((variant, idx) => (
                            <span key={idx} className={styles.listItem}>{variant}</span>
                        ))}
                    </div>
                </section>
            )}

            {biome.tips && biome.tips.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>💡</span>
                        Tips
                    </h2>
                    <div className={styles.tipsList}>
                        {biome.tips.map((tip, idx) => (
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
