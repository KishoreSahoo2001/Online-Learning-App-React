import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyPurchases from "../pages/MyPurchases";
import api from "../interceptor/api";
import { mockPurchases } from "../__mocks__/mockData";

jest.mock("../interceptor/api", () => ({
  get: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("MyPurchases Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockResolvedValue({ data: { purchases: mockPurchases } });
  });

  test("renders MyPurchases component", async () => {
    render(
      <MemoryRouter>
        <MyPurchases />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/articles/purchases"));
    expect(screen.getByText("My Purchases")).toBeInTheDocument();
  });

  test("displays purchased books", async () => {
    render(
      <MemoryRouter>
        <MyPurchases />
      </MemoryRouter>
    );

    await waitFor(() => {
      mockPurchases.forEach((purchase) => {
        expect(screen.getByText(purchase.title)).toBeInTheDocument();
        expect(screen.getByText(`₹${purchase.price.toFixed(2)}`)).toBeInTheDocument();
      });
    });
  });

  test('displays "Explore More" button for each purchased book', async () => {
    render(
      <MemoryRouter>
        <MyPurchases />
      </MemoryRouter>
    );

    await waitFor(() => {
      mockPurchases.forEach(() => {
        expect(screen.getAllByText("Explore More")).not.toHaveLength(0);
      });
    });
  });

  test("handles 'Explore More' button click", async () => {
    render(
      <MemoryRouter>
        <MyPurchases />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/articles/purchases"));

    const exploreMoreButtons = await screen.findAllByText("Explore More");
    expect(exploreMoreButtons.length).toBeGreaterThan(0);

    fireEvent.click(exploreMoreButtons[0]);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/explore", {
        state: {
          articleId: mockPurchases[0].id,
          articlePrice: mockPurchases[0].price,
          articleTitle: mockPurchases[0].title,
        },
      });
    });
  });

  test("displays 'No purchased books found' when the list is empty", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { purchases: [] } });

    render(
      <MemoryRouter>
        <MyPurchases />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("No purchased books found.")).toBeInTheDocument());
  });
});