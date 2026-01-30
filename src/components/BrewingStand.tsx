import styles from './BrewingStand.module.css';

interface BrewingRecipe {
    base: string;
    ingredient: string;
    upgrade?: string;
}

interface BrewingStandProps {
    recipe: BrewingRecipe;
}

const ingredientEmojis: Record<string, string> = {
    'Awkward Potion': '🧪',
    'Water Bottle': '💧',
    'Potion of Night Vision': '👁️',
    'Potion of Poison or Healing': '☠️',
    'Potion of Swiftness or Leaping': '⚡',
    'Glistering Melon Slice': '🍈',
    'Ghast Tear': '💧',
    'Blaze Powder': '🔶',
    'Sugar': '🍬',
    'Magma Cream': '🟠',
    'Fermented Spider Eye': '🕷️',
    'Golden Carrot': '🥕',
    'Pufferfish': '🐡',
    'Phantom Membrane': '🦇',
    "Rabbit's Foot": '🐰',
    'Spider Eye': '👁️',
    'Turtle Shell': '🐢',
    'Glowstone Dust': '✨',
    'Redstone': '🔴',
    'Gunpowder': '💨',
    "Dragon's Breath": '🐉',
};

function getIngredientEmoji(ingredient: string): string {
    return ingredientEmojis[ingredient] || '📦';
}

export default function BrewingStand({ recipe }: BrewingStandProps) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span>⚗️</span>
                <span>Brewing Recipe</span>
            </div>

            <div className={styles.brewingArea}>
                <div className={styles.ingredientSection}>
                    <div className={styles.stepLabel}>Base</div>
                    <div className={styles.ingredientSlot}>
                        <span className={styles.emoji}>{getIngredientEmoji(recipe.base)}</span>
                        <span className={styles.itemName}>{recipe.base}</span>
                    </div>
                </div>

                <div className={styles.plusSign}>+</div>

                <div className={styles.ingredientSection}>
                    <div className={styles.stepLabel}>Add</div>
                    <div className={styles.ingredientSlot}>
                        <span className={styles.emoji}>{getIngredientEmoji(recipe.ingredient)}</span>
                        <span className={styles.itemName}>{recipe.ingredient}</span>
                    </div>
                </div>

                <div className={styles.arrow}>→</div>

                <div className={styles.resultSection}>
                    <div className={styles.stepLabel}>Result</div>
                    <div className={styles.resultSlot}>
                        <span className={styles.resultEmoji}>⚗️</span>
                    </div>
                </div>
            </div>

            {recipe.upgrade && (
                <div className={styles.upgradeNote}>
                    <span className={styles.upgradeIcon}>⬆️</span>
                    <span>Upgrade: {recipe.upgrade}</span>
                </div>
            )}
        </div>
    );
}
