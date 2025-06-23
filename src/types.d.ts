import '@testing-library/jest-dom';

declare global {
  // расширение типов jest-dom происходит автоматически через импорт
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
