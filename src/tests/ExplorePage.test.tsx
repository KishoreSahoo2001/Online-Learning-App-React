import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ExplorePage from '../pages/ExplorePage';
import api from '../interceptor/api';
import { mockArticleDetails } from '../__mocks__/mockData';

jest.mock('../interceptor/api', () => ({
  get: jest.fn(),
}));

jest.mock("react-router-dom", () => {
  const actualRouter = jest.requireActual("react-router-dom");
  return {
    ...actualRouter,
    useLocation: () => ({
      state: { articleId: 1, articlePrice: 20, articleTitle: "React Basics" },
    }),
    useNavigate: jest.fn(),
  };
});

describe("ExplorePage", () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test("renders loading state initially", () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { articleDetails: null } });

    render(
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays 'Article not found' when no article is returned", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { articleDetails: null } });

    render(
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/article not found/i)).toBeInTheDocument()
    );
  });

  test("fetches and displays article details correctly", async () => {
    (api.get as jest.Mock).mockImplementation((url) => {
      if (url === "/articles/article-details/1") {
        return Promise.resolve({ data: { articleDetails: mockArticleDetails } });
      }
      if (url === "/articles/purchases") {
        return Promise.resolve({ data: { purchases: [{ id: 1 }] } });
      }
      return Promise.reject(new Error("API Error"));
    });

    render(
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/articles/article-details/1"));
    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/articles/purchases"));

    expect(screen.getByText(mockArticleDetails.title)).toBeInTheDocument();
  });

  test("handles purchase status correctly", async () => {
    (api.get as jest.Mock).mockImplementation((url) => {
      console.log(`Mock API call: ${url}`);
  
      if (url === "/articles/article-details/1") {
        console.log("Returning article details:", mockArticleDetails);
        return Promise.resolve({ data: { articleDetails: mockArticleDetails } });
      }
      if (url === "/articles/purchases") {
        console.log("Returning purchases: [{ id: 1 }]"); 
        return Promise.resolve({ data: { purchases: [{ id: 1 }] } });
      }
  
      console.log("API Error for URL:", url);
      return Promise.reject(new Error("API Error"));
    });
  
    render(
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/articles/purchases");
    });
  });

  test("handles 'Buy Now' button click", async () => {
    (api.get as jest.Mock).mockImplementation((url) => {
      if (url === "/articles/article-details/1") {
        return Promise.resolve({ data: { articleDetails: mockArticleDetails } });
      }
      if (url === "/articles/purchases") {
        return Promise.resolve({ purchases: [] });
      }
      return Promise.reject(new Error("API Error"));
    });

    render(
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/articles/article-details/1"));

    const buyNowButton = await screen.findByRole("button", { name: /buy now/i });
    
    act(() => {
      fireEvent.click(buyNowButton);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/payment", {
        state: {
          articleId: 1,
          price: 20,
          title: "React Basics",
        },
      });
    });
  });
});