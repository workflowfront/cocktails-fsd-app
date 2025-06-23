import { useGetCocktailsByCodeQuery } from '@entities/cocktail/model/cocktailApi';
import { CocktailCode } from '@shared/types/cocktail';

export function useCocktails(code?: CocktailCode) {
  if (!code) {
    return { cocktails: [], loading: false, error: null };
  }
  const { data: cocktails = [], isLoading, error } = useGetCocktailsByCodeQuery(code);
  return {
    cocktails,
    loading: isLoading,
    error: error ? 'Ошибка загрузки' : null,
  };
}
