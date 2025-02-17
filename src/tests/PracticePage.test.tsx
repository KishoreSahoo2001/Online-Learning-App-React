import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PracticePage from "../pages/PracticePage";
import api from "../interceptor/api";
import { mockQuestions } from "../__mocks__/mockData";

jest.mock("../interceptor/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("PracticePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockResolvedValue({ data: { questions: mockQuestions } });
  });

  test("renders PracticePage component", async () => {
    render(
      <MemoryRouter>
        <PracticePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/quizzes/2/questions"));
    expect(screen.getByText("Practice Quiz")).toBeInTheDocument();
  });

  test("displays available quizzes", async () => {
    render(
      <MemoryRouter>
        <PracticePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockQuestions[0].question_text)).toBeInTheDocument();
    });
  });

  test("handles quiz submission", async () => {
    (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter>
        <PracticePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("What is React?")).toBeInTheDocument();
    });

  fireEvent.click(screen.getByLabelText("Library"));
  fireEvent.click(screen.getByLabelText("JavaScript XML"));

  fireEvent.click(screen.getByText("Submit Quiz"));

  await waitFor(() => {
    expect(api.post).toHaveBeenCalledWith("/quizzes/submit", {
      quiz_id: 2,
      answers: {
        "1": "Library",
        "2": "JavaScript XML",
      },
    });
  });
});
});