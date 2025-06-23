import React from 'react';
import { Cocktail } from '@shared/types/cocktail';
import { MAX_INGREDIENTS } from '@shared/constants/cocktail';

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  const ingredients = Array.from({ length: MAX_INGREDIENTS }, (_, i) => i + 1)
    .map((i) => ({
      measure: cocktail[`strMeasure${i}` as keyof Cocktail],
      ingredient: cocktail[`strIngredient${i}` as keyof Cocktail],
    }))
    .filter((item) => item.ingredient);

  return (
    <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
      <div style={{ minWidth: 180 }}>
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          loading="lazy"
          style={{ width: 180, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}
        />
      </div>
      <div>
        <h2>{cocktail.strDrink}</h2>
        <div style={{ marginBottom: 8 }}>
          <span>{cocktail.strCategory}</span> | <span>{cocktail.strAlcoholic}</span> |{' '}
          <span>{cocktail.strGlass}</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <b>Instructions:</b>
          <br />
          {cocktail.strInstructions}
        </div>
        <div>
          <b>List of ingredients:</b>
          <ul>
            {ingredients.map((item, idx) => (
              <li key={idx}>
                {item.ingredient} {item.measure && `(${item.measure})`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
