import { render, screen } from '@testing-library/react';
import App from './App';

// Test pour vérifier que le composant App se rend correctement sans planter.
test('renders App component without crashing', () => {
  // Rendu du composant App
  render(<App />);
  // Recherche d'un élément avec le rôle "banner" dans le DOM
  const appElement = screen.getByRole('banner');
  // Vérification que cet élément est bien présent dans le DOM
  expect(appElement).toBeInTheDocument();
});

// Test pour vérifier que le composant App contient un en-tête (header).
test('App component has a header', () => {
  // Rendu du composant App
  render(<App />);
  // Recherche d'un élément avec le rôle "banner" dans le DOM
  const headerElement = screen.getByRole('banner');
  // Vérification que cet élément est bien présent dans le DOM
  expect(headerElement).toBeInTheDocument();
});

// Test pour vérifier que l'en-tête du composant App a une classe CSS spécifique.
test('App component header has correct class', () => {
  // Rendu du composant App
  render(<App />);
  // Recherche d'un élément avec le rôle "banner" dans le DOM
  const headerElement = screen.getByRole('banner');
  // Vérification que cet élément a la classe CSS 'App-header'
  expect(headerElement).toHaveClass('App-header');
});
