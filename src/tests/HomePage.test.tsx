import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import api from '../interceptor/api';
import { mockArticles } from '../__mocks__/mockData';

jest.mock('../interceptor/api', () => ({
  get: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: { articles: mockArticles } });
  });

  test('renders homepage with welcome section', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/articles'));
    expect(screen.getByText(/hello, user/i)).toBeInTheDocument();
  });

  test('search functionality filters articles', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/articles'));

    const searchInput = screen.getByPlaceholderText('Search articles...');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    });
  });

  test('reset functionality restores all articles', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/articles'));

    const searchInput = screen.getByPlaceholderText('Search articles...');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Reset'));

    await waitFor(() => {
      mockArticles.forEach((article) => {
        expect(screen.getByText(article.title)).toBeInTheDocument();
      });
    });
  });

  test('clicking "Explore Now" navigates to explore page', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/articles'));
  
    const exploreButton = await screen.findByRole('button', { name: /explore now/i });
    expect(exploreButton).toBeInTheDocument();
  
    fireEvent.click(exploreButton);
  
    expect(mockNavigate).toHaveBeenCalledWith('/explore', {
      state: {
        articleId: expect.any(Number),
        articlePrice: expect.any(Number),
        articleTitle: expect.any(String),
      },
    });
  });
});