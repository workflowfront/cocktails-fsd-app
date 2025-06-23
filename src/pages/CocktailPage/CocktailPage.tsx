import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCocktailsByCodeQuery } from '@entities/cocktail/cocktailApi';
import { Cocktail, CocktailCode } from '@shared/types/cocktail';
import styles from './CocktailPage.module.scss';

// TODO: добавить спиннер вместо "Загрузка..." и обработку ошибок через отдельный компонент
// const debug = false; // для отладки, можно включить при необходимости

const CocktailPage: React.FC = () => {
  const { code } = useParams<{ code: CocktailCode }>();
  const { data: cocktails, isLoading, isError } = useGetCocktailsByCodeQuery(code || '');

  if (isLoading) return <div>Загрузка...</div>; // можно заменить на Loader позже
  if (isError) return <div>Ошибка: {isError}</div>; // FIXME: сделать нормальное отображение ошибок
  if (!cocktails || cocktails.length === 0) return <div>Нет данных</div>;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {cocktails.map((c) => {
          // собираем ингредиенты (максимум 15, 14)?
          const ingredients = Array.from({ length: 15 }, (_, i) => i + 1)
            .map((i) => ({
              measure: c[`strMeasure${i}` as keyof Cocktail],
              ingredient: c[`strIngredient${i}` as keyof Cocktail],
            }))
            .filter((item) => item.ingredient);
          return (
            <div key={c.idDrink} className={styles.cocktailRow}>
              <div className={styles.thumb}>
                <img src={c.strDrinkThumb} alt={c.strDrink} loading="lazy" />
                {/* Можно добавить обработку onError для картинки? */}
              </div>
              <div className={styles.cocktailContent}>
                <h2 className={styles.title}>{c.strDrink}</h2>
                <div className={styles.meta}>
                  <span>{c.strCategory}</span>
                  <span>{c.strAlcoholic}</span>
                  <span>{c.strGlass}</span>
                </div>
                <div className={styles.instructions}>
                  <b>Instructions:</b>
                  <br />
                  {c.strInstructions}
                </div>
                <div className={styles.ingredients}>
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
        })}
      </div>
    </div>
  );
};

export default CocktailPage;
