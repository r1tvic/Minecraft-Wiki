import styles from './CraftingTable.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CraftingTableProps {
    recipe: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// Emoji mapping for common Minecraft items
const itemEmojis: Record<string, string> = {
    oak_planks: '🟫',
    cobblestone: '⬜',
    iron_ingot: '🔩',
    gold_ingot: '🥇',
    diamond: '💎',
    stick: '🪵',
    coal: '🖤',
    redstone: '🔴',
    string: '🧵',
    wool: '🐑',
    book: '📕',
    obsidian: '⬛',
    glass: '🪟',
    nether_star: '⭐',
    blaze_rod: '🔥',
    gunpowder: '💨',
    sand: '🏖️',
    iron_block: '⬜',
    bow: '🏹',
    quartz: '⬜',
    log: '🪵',
    furnace: '🔥',
    smooth_stone: '⬜',
    chest: '📦',
    tripwire_hook: '🪝',
    wood_slab: '🪵',
    bookshelf: '📚',
    leather: '🟤',
    paper: '📃',
    ender_pearl: '🟣',
    blaze_powder: '🔶',
    flint: '🪨',
};

function getItemEmoji(item: string | null): string {
    if (!item) return '';
    return itemEmojis[item] || '📦';
}

function formatItemName(item: string | null): string {
    if (!item) return '';
    return item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function CraftingTable({ recipe }: CraftingTableProps) {
    // Normalize pattern to 3x3
    const normalizedPattern: (string | null)[][] = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    if (recipe.type === 'shaped' && recipe.pattern) {
        (recipe.pattern as (string | null)[][]).forEach((row: (string | null)[], rowIdx: number) => {
            row.forEach((cell: string | null, colIdx: number) => {
                if (rowIdx < 3 && colIdx < 3) {
                    normalizedPattern[rowIdx][colIdx] = cell;
                }
            });
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.craftingArea}>
                <div className={styles.grid}>
                    {normalizedPattern.flat().map((item, idx) => (
                        <div key={idx} className={styles.slot} title={formatItemName(item)}>
                            {item && <span className={styles.itemEmoji}>{getItemEmoji(item)}</span>}
                        </div>
                    ))}
                </div>

                <div className={styles.arrow}>
                    <span>→</span>
                </div>

                <div className={styles.resultSlot}>
                    <span className={styles.resultEmoji}>{getItemEmoji(recipe.result.item)}</span>
                    {recipe.result.count > 1 && (
                        <span className={styles.count}>{recipe.result.count}</span>
                    )}
                </div>
            </div>

            {recipe.type === 'shapeless' && recipe.ingredients && (
                <div className={styles.shapelessNote}>
                    <span className={styles.shapelessIcon}>🔀</span>
                    <span>Shapeless Recipe</span>
                    <div className={styles.ingredientList}>
                        {(recipe.ingredients as string[]).map((ing: string, idx: number) => (
                            <span key={idx} className={styles.ingredient} title={formatItemName(ing)}>
                                {getItemEmoji(ing)}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
