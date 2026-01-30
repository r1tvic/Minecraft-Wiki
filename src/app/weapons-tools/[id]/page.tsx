import Link from 'next/link';
import { notFound } from 'next/navigation';
import weaponsData from '@/data/weapons-tools.json';
import CraftingTable from '@/components/CraftingTable';
import styles from '../../detail.module.css';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return weaponsData.weapons_and_tools.map((item) => ({
        id: item.id,
    }));
}

export default async function WeaponToolDetailPage({ params }: PageProps) {
    const { id } = await params;
    const item = weaponsData.weapons_and_tools.find(w => w.id === id);

    if (!item) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <Link href="/weapons-tools" className={styles.backLink}>
                ← Back to Weapons & Tools
            </Link>

            <header className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.emoji}>{item.emoji}</span>
                </div>
                <div className={styles.titleArea}>
                    <h1 className={styles.title}>
                        {item.name}
                        <span className={styles.badge}>{item.material}</span>
                    </h1>
                    <p className={styles.description}>{item.description}</p>
                </div>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>📊</span>
                    Stats
                </h2>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Type</div>
                        <div className={styles.statValue}>{item.type}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Material</div>
                        <div className={styles.statValue}>{item.material}</div>
                    </div>
                    {item.damage && (
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Damage</div>
                            <div className={styles.statValue}>{item.damage}</div>
                        </div>
                    )}
                    {item.attackSpeed && (
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Attack Speed</div>
                            <div className={styles.statValue}>{item.attackSpeed}</div>
                        </div>
                    )}
                    {item.miningSpeed && (
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Mining Speed</div>
                            <div className={styles.statValue}>{item.miningSpeed}</div>
                        </div>
                    )}
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Durability</div>
                        <div className={styles.statValue}>{item.durability}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Enchantable</div>
                        <div className={styles.statValue}>{item.enchantable ? 'Yes ✓' : 'No ✗'}</div>
                    </div>
                </div>
            </section>

            {item.upgradeFrom && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>⬆️</span>
                        Upgrade Path
                    </h2>
                    <div className={styles.list}>
                        <span className={styles.listItem}>
                            Upgrade from {item.upgradeFrom.replace(/_/g, ' ')} at Smithing Table with Netherite Upgrade template
                        </span>
                    </div>
                </section>
            )}

            {item.obtainedFrom && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>📥</span>
                        How to Obtain
                    </h2>
                    <div className={styles.list}>
                        <span className={styles.listItem}>{item.obtainedFrom}</span>
                    </div>
                </section>
            )}

            {item.recipe && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🛠️</span>
                        Crafting Recipe
                    </h2>
                    <CraftingTable recipe={item.recipe} />
                </section>
            )}
        </div>
    );
}
