import { useParams } from 'react-router-dom';
import { useCocktails } from '@features/cocktail-list/model/useCocktails';
import CocktailCard from '@entities/cocktail/ui/CocktailCard';
import { CocktailCode } from '@shared/types/cocktail';
import styles from './CocktailPage.module.scss';

const CocktailPage = () => {
  const { code } = useParams<{ code?: string }>();
  const validCodes: CocktailCode[] = ['margarita', 'mojito', 'a1', 'kir'];
  const cocktailCode = validCodes.includes(code as CocktailCode)
    ? (code as CocktailCode)
    : undefined;
  const { cocktails, loading, error } = useCocktails(cocktailCode);

  if (!cocktailCode) return <div>Некорректный код коктейля</div>;
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!cocktails.length) return <div>Коктейли не найдены</div>;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {cocktails.map((c) => (
          <CocktailCard key={c.idDrink} cocktail={c} />
        ))}
      </div>
    </div>
  );
};

export default CocktailPage;
