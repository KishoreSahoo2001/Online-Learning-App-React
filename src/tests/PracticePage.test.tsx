import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PracticePage from "../pages/PracticePage";
import api from "../interceptor/api";
import { mockQuestions, mockPurchasedArticles, mockQuizzes } from "../__mocks__/mockData";

jest.mock("../interceptor/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("PracticePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (api.get as jest.Mock).mockImplementation((url) => {
      if (url === "/articles/purchases") {
        return Promise.resolve({ data: { purchases: mockPurchasedArticles } });
      }
      const articleId = mockPurchasedArticles[0].id;
      const quizId = mockQuizzes[0].id;

      if (url === `/quizzes/${articleId}`) {
        return Promise.resolve({ data: { quizzes: mockQuizzes } });
      }
      if (url === `/quizzes/${quizId}/questions`) {
        return Promise.resolve({ data: { questions: mockQuestions } });
      }
      return Promise.reject(new Error("Invalid API call"));
    });

    (api.post as jest.Mock).mockImplementation((url) => {
      if (url === "/quizzes/submit") {
        return Promise.resolve({ data: { message: "Quiz submitted successfully!", score: 90 } });
      }
      return Promise.reject(new Error("Submission failed"));
    });
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <PracticePage />
      </MemoryRouter>
    );

  test("renders PracticePage component and fetches purchased articles", async () => {
    renderComponent();

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/articles/purchases"));
    expect(screen.getByText("Practice Quiz")).toBeInTheDocument();
  });

  test("displays available purchased articles and allows selecting one", async () => {
    renderComponent();

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/articles/purchases");
      expect(screen.getByText(mockPurchasedArticles[0].title)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole("combobox"), { target: { value: mockPurchasedArticles[0].id.toString() } });

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/quizzes/${mockPurchasedArticles[0].id}`);
      expect(screen.getByText(mockQuizzes[0].title)).toBeInTheDocument();
    });
  });
});