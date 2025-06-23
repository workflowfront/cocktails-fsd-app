import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { COCKTAIL_CODES } from '@shared/constants/cocktails';

describe('Sidebar', () => {
  it('показывает все коктейли в меню', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    // проверяем что все коктейли отображаются
    COCKTAIL_CODES.forEach((code) => {
      const display = code.charAt(0).toUpperCase() + code.slice(1);
      expect(screen.getByText(display)).toBeInTheDocument();
    });
  });

  it('подсвечивает выбранный коктейль', () => {
    render(
      <MemoryRouter initialEntries={[`/mojito`]}>
        <Sidebar />
      </MemoryRouter>,
    );

    const activeLink = screen.getByText('Mojito');
    expect(activeLink.className).toMatch(/active/); // проверяем что есть класс active
  });
});
