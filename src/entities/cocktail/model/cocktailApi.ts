import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Cocktail } from '@shared/types/cocktail';

// TODO: добавить кэширование и обработку ошибок сети
// const API_TIMEOUT = 5000; // таймаут для запросов (пока не используется)

interface CocktailsResponse {
  drinks: Cocktail[] | null; // API возвращает null если ничего не найдено
}

export const cocktailApi = createApi({
  reducerPath: 'cocktailApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1/' }),
  endpoints: (builder) => ({
    getCocktailsByCode: builder.query<Cocktail[], string>({
      query: (code) => `search.php?s=${code}`, // поиск по названию коктейля
      transformResponse: (response: CocktailsResponse) => response.drinks || [], // если null, возвращаем пустой массив
    }),
  }),
});

export const { useGetCocktailsByCodeQuery } = cocktailApi;
