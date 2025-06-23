import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '@widgets/Sidebar';
import { COCKTAIL_CODES } from '@shared/constants/cocktails';

// TODO: добавить обработку ошибок для Suspense (можно через ErrorBoundary)
// const SomeUnusedComponent = () => null; // пока не нужен, может пригодится позже

const CocktailPage = lazy(() => import('@pages/CocktailPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

const firstCode = COCKTAIL_CODES[0]; // первый коктейль для редиректа

const App = () => (
  <div className="app-layout">
    <Sidebar />
    <main className="main-content">
      {/* Suspense нужен для ленивой загрузки страниц */}
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to={`/${firstCode}`} replace />} />
          <Route path=":code" element={<CocktailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>
  </div>
);

export default App;
