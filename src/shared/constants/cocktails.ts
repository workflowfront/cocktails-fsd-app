export const COCKTAIL_CODES = ['margarita', 'mojito', 'a1', 'kir'] as const;

export type CocktailCode = (typeof COCKTAIL_CODES)[number];
