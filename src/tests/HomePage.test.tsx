import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import api from '../components/api';
import { mockArticles } from '../__mocks__/mockData';

jest.mock('../components/api', () => ({
  get: jest.fn(),
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

    await waitFor(() => expect(api.get).toHaveBeenCalled());
    expect(screen.getByText(/hello, user/i)).toBeInTheDocument();
  });
});