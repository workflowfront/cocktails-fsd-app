import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { configureStore } from '@reduxjs/toolkit';

// мокаем API чтобы не делать реальные запросы в тестах
jest.mock('@entities/cocktail/model/cocktailApi', () => ({
  __esModule: true,
  cocktailApi: { reducerPath: 'mock', reducer: (state = null) => state, middleware: jest.fn() },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useGetCocktailsByCodeQuery: (_code: string) => ({
    isLoading: false,
    isError: false,
    data: [
      {
        idDrink: '1',
        strDrink: 'Test Cocktail',
        strCategory: 'Category',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Glass',
        strInstructions: 'Instructions',
        strDrinkThumb: 'img.jpg',
      },
    ],
  }),
}));

const testStore = configureStore({ reducer: { mock: (state = null) => state } });

describe('App', () => {
  it('показывает меню и страницу коктейля', async () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/mojito']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    // проверяем что меню отображается
    expect(screen.getByText('Mojito')).toBeInTheDocument();

    // ждем загрузки заголовка страницы
    await screen.findByRole('heading', { level: 2 });
  });
});
