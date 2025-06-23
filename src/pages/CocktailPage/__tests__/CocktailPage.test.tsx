import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CocktailPage from '../CocktailPage';
import { configureStore } from '@reduxjs/toolkit';

// мокаем API для тестов
jest.mock('@entities/cocktail/cocktailApi', () => ({
  __esModule: true,
  cocktailApi: { reducerPath: 'mock', reducer: (state = null) => state, middleware: jest.fn() },
  useGetCocktailsByCodeQuery: (code: string) => {
    if (code === 'error') return { isLoading: false, isError: true };
    if (code === 'loading') return { isLoading: true };
    return {
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
    };
  },
}));

const testStore = configureStore({ reducer: { mock: (state = null) => state } });

describe('CocktailPage', () => {
  it('показывает спиннер при загрузке', () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/loading']}>
          <Routes>
            <Route path=":code" element={<CocktailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });

  it('показывает сообщение об ошибке', () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/error']}>
          <Routes>
            <Route path=":code" element={<CocktailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
  });

  it('отображает данные коктейля', () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/mojito']}>
          <Routes>
            <Route path=":code" element={<CocktailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // проверяем что название и инструкции отображаются
    expect(screen.getByText('Test Cocktail')).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
  });
});
