import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ExplorePage from '../pages/ExplorePage';
import api from '../interceptor/api';
import { addToCart } from '../redux/cartSlice';
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

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe("ExplorePage", () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
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

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/articles/purchases");
    });

    expect(screen.queryByRole("button", { name: /add to cart/i })).not.toBeInTheDocument();
  });

  test("handles 'Add to Cart' button click", async () => {
    (api.get as jest.Mock).mockImplementation((url) => {
      if (url === "/articles/article-details/1") {
        return Promise.resolve({ data: { articleDetails: mockArticleDetails } });
      }
      if (url === "/articles/purchases") {
        return Promise.resolve({ data: { purchases: [] } });
      }
      return Promise.reject(new Error("API Error"));
    });

    render(
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/articles/article-details/1"));

    const addToCartButton = await screen.findByRole("button", { name: /add to cart/i });
    
    act(() => {
      fireEvent.click(addToCartButton);
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(addToCart({ id: 1, title: "React Basics", price: 20 }));
    });

    expect(screen.getByText(/added to cart/i)).toBeInTheDocument();
  });

  test("displays course details correctly", async () => {
    (api.get as jest.Mock).mockImplementation((url) => {
      if (url === "/articles/article-details/1") {
        return Promise.resolve({ data: { articleDetails: mockArticleDetails } });
      }
      if (url === "/articles/purchases") {
        return Promise.resolve({ data: { purchases: [] } });
      }
      return Promise.reject(new Error("API Error"));
    });

    render(
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/articles/article-details/1"));

    expect(screen.getByText(/language/i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/learners/i)).toBeInTheDocument();
    expect(screen.getByText(/what you'll learn/i)).toBeInTheDocument();
    expect(screen.getByText(/this course includes/i)).toBeInTheDocument();
    expect(screen.getByText(/course content/i)).toBeInTheDocument();
  });

  test("handles API failure gracefully", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2));

    expect(screen.getByText(/article not found/i)).toBeInTheDocument();
  });

});