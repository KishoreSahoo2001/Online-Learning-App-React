import React from "react";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyLearningPage from "../pages/MyLearningPage";
import api from "../interceptor/api";

jest.mock("../interceptor/api", () => ({
  get: jest.fn(),
  put: jest.fn(),
}));

describe("MyLearningPage", () => {
  beforeAll(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  beforeEach(() => {
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    localStorage.removeItem("token");
    jest.clearAllMocks();
  });

  test("displays 'No purchased articles found' when list is empty", async () => {
    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url === "/progress/overall") {
        return Promise.resolve({ data: { progress: [] } });
      }
      if (url === "/articles/purchases") {
        return Promise.resolve({ data: { purchases: [] } });
      }
      return Promise.reject(new Error("Unknown API call"));
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <MyLearningPage />
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(screen.getByText("No purchased articles found.")).toBeInTheDocument());
  });

  test("handles API failure gracefully", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("API error"));

    await act(async () => {
      render(
        <MemoryRouter>
          <MyLearningPage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("No purchased articles found.")).toBeInTheDocument();
    });
  });

  test("updates progress when user toggles status", async () => {
    const mockProgress = [{ article_id: 1, status: "not started" }];
    const mockPurchases = [{ id: 1, title: "React Basics", author: "John Doe" }];

    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url === "/progress/overall") {
        return Promise.resolve({ data: { progress: mockProgress } });
      }
      if (url === "/articles/purchases") {
        return Promise.resolve({ data: { purchases: mockPurchases } });
      }
      return Promise.reject(new Error("Unknown API call"));
    });

    (api.put as jest.Mock).mockResolvedValue({ data: { success: true } });

    await act(async () => {
      render(
        <MemoryRouter>
          <MyLearningPage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("React Basics")).toBeInTheDocument();
    });

    const toggleButton = screen.getByText("React Basics").closest(".learning-card")?.querySelector("button");

    expect(toggleButton).toBeTruthy();
    fireEvent.click(toggleButton!);

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith("/progress/update", expect.any(Object));
    });
  });

  test("handles progress update failure", async () => {
    const mockProgress = [{ article_id: 1, status: "not started" }];
    const mockPurchases = [{ id: 1, title: "React Basics", author: "John Doe" }];

    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url === "/progress/overall") {
        return Promise.resolve({ data: { progress: mockProgress } });
      }
      if (url === "/articles/purchases") {
        return Promise.resolve({ data: { purchases: mockPurchases } });
      }
      return Promise.reject(new Error("Unknown API call"));
    });

    (api.put as jest.Mock).mockRejectedValue(new Error("Update failed"));

    await act(async () => {
      render(
        <MemoryRouter>
          <MyLearningPage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("React Basics")).toBeInTheDocument();
    });

    const toggleButton = screen.getByText("React Basics").closest(".learning-card")?.querySelector("button");

    expect(toggleButton).toBeTruthy();
    fireEvent.click(toggleButton!);

    await waitFor(() => {
      expect(api.put).toHaveBeenCalled();
    });

    expect(screen.getByText("React Basics")).toBeInTheDocument();
  });
});