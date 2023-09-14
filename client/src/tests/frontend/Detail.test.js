import React from 'react';
import { render } from '@testing-library/react';
import Detail from '../../views/DetailPage/DetailPage';

test('renders Pokemon details', () => {
  const mockPokemonDetail = {
    name: 'Pikachu',
    image: 'https://example.com/pikachu.jpg',
    hp: 60,
    attack: 40,
    defense: 30,
    speed: 80,
    height: 0.4,
    weight: 6,
    types: ['Electric']
  };

  const { getByText, getByAltText } = render(<Detail pokemonDetail={mockPokemonDetail} />);

  const nameElement = getByText(/Pikachu/i);
  expect(nameElement).toBeInTheDocument();

  const imageElement = getByAltText('Pikachu');
  expect(imageElement).toBeInTheDocument();

  const hpElement = getByText(/HP: 60/i);
  expect(hpElement).toBeInTheDocument();

  // Agrega más pruebas para otros detalles del Pokémon según la estructura del componente
});

// import { render, screen } from '@testing-library/react';
// import App from '../../App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

