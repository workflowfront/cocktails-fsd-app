import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CocktailPage from '../CocktailPage';
import { configureStore } from '@reduxjs/toolkit';
import { useGetCocktailsByCodeQuery } from '@entities/cocktail/model/cocktailApi';

jest.mock('@entities/cocktail/model/cocktailApi', () => {
  return {
    __esModule: true,
    cocktailApi: { reducerPath: 'mock', reducer: (state = null) => state, middleware: jest.fn() },
    useGetCocktailsByCodeQuery: jest.fn(),
  };
});

const mockedUseGetCocktailsByCodeQuery = useGetCocktailsByCodeQuery as jest.Mock;

const testStore = configureStore({ reducer: { mock: (state = null) => state } });

describe('CocktailPage', () => {
  it('показывает спиннер при загрузке', () => {
    mockedUseGetCocktailsByCodeQuery.mockReturnValue({ isLoading: true });
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/mojito']}>
          <Routes>
            <Route path=":code" element={<CocktailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });

  it('показывает сообщение об ошибке', () => {
    mockedUseGetCocktailsByCodeQuery.mockReturnValue({ isLoading: false, error: true });
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/mojito']}>
          <Routes>
            <Route path=":code" element={<CocktailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
  });

  it('отображает данные коктейля', () => {
    mockedUseGetCocktailsByCodeQuery.mockReturnValue({
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
    });
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
