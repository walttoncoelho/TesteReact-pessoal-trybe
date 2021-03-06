import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('7- Teste o componente <PokemonDetails.js', () => {
  const pokeData = data[0];
  const { name, type, summary } = pokeData;
  test('1.1- Verificando informações detalhadas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/ });
    fireEvent.click(moreDetails);
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
    expect(screen.getByText(`${type}`)).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
    expect(screen.getByText(`Game Locations of ${name}`)).toBeInTheDocument();
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toBeDefined();
  });
  //-----------------------------------------------------
  test('1-Teste se as informações detalhadas do Pokémon selecionado', () => {
    renderWithRouter(<App />);
    // Testando o Sumário
    // Verifica se tem a palavra Details
    const moreDetails = (screen.getByText(/More details/));
    fireEvent.click(moreDetails);
    const details = (screen.getByRole('heading',
      { level: 2, name: /Details/ }));
    expect(details).toBeInTheDocument();
    // Verifica se tem a palavra Summary
    const sumary = (screen.getByRole('heading',
      { level: 2, name: /Summary/ }));
    expect(sumary).toBeInTheDocument();
    // Verifica o H2 Location
    const gameLocation = (screen.getByRole('heading',
      { level: 2, name: /Game Locations of Pikachu/ }));
    expect(gameLocation).toBeInTheDocument();
    // Testando o Parágrafo
    const paragraph = (screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/));
    expect(paragraph).toBeInTheDocument();
    // Verifica alt Location / Images
    const pokLocationImg = screen.getAllByAltText(/Pikachu location/);
    expect(pokLocationImg[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokLocationImg[0].alt).toBe(`${name} location`);
    expect(pokLocationImg[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pokLocationImg[1].alt).toBe(`${name} location`);
    // Testa o checkBox
    const checkLabel = screen.getByLabelText(/Pokémon favoritado?/);
    expect(checkLabel).toBeInTheDocument();
    fireEvent.click(checkLabel);
    const markedFavorite = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(markedFavorite).toBeInTheDocument();
    // Espera que o botão mais detalhes não exista
    fireEvent.click(checkLabel);
    expect(moreDetails).not.toBeInTheDocument();
  });
});
