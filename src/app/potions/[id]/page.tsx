import Link from 'next/link';
import { notFound } from 'next/navigation';
import potionsData from '@/data/potions.json';
import BrewingStand from '@/components/BrewingStand';
import styles from '../../detail.module.css';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return potionsData.potions.map((potion) => ({
        id: potion.id,
    }));
}

export default async function PotionDetailPage({ params }: PageProps) {
    const { id } = await params;
    const potion = potionsData.potions.find(p => p.id === id);

    if (!potion) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <Link href="/potions" className={styles.backLink}>
                ← Back to Potions
            </Link>

            <header className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.emoji}>{potion.emoji}</span>
                </div>
                <div className={styles.titleArea}>
                    <h1 className={styles.title}>
                        {potion.name}
                        <span className={styles.badge}>{potion.category}</span>
                    </h1>
                    <p className={styles.description}>{potion.description}</p>
                </div>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>✨</span>
                    Effect Details
                </h2>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Effect</div>
                        <div className={styles.statValue}>{potion.effect}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Duration</div>
                        <div className={styles.statValue}>{potion.duration}</div>
                    </div>
                    {potion.baseDuration && (
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Base Duration</div>
                            <div className={styles.statValue}>{potion.baseDuration}</div>
                        </div>
                    )}
                    {potion.extendedDuration && (
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Extended Duration</div>
                            <div className={styles.statValue}>{potion.extendedDuration}</div>
                        </div>
                    )}
                </div>
            </section>

            {potion.brewing && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>⚗️</span>
                        Brewing Recipe
                    </h2>
                    <BrewingStand recipe={potion.brewing} />
                </section>
            )}

            {potion.tips && potion.tips.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>💡</span>
                        Tips
                    </h2>
                    <div className={styles.tipsList}>
                        {potion.tips.map((tip, idx) => (
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
