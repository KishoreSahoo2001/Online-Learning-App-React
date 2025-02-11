import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExplorePage from '../pages/ExplorePage';
import api from '../components/api';
import { mockArticleDetails } from '../__mocks__/mockData';

jest.mock('../components/api', () => ({
  get: jest.fn(),
}));

describe('ExplorePage', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: { articleDetails: mockArticleDetails } });
  });

  test('renders ExplorePage with article details', async () => {
    render(
      <MemoryRouter initialEntries={['/explore']}>
        <ExplorePage />
      </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText((content) => content.includes("John Doe"))).toBeInTheDocument();
    });
})
});