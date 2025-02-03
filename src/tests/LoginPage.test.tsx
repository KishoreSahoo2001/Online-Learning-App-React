import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import axios from "axios";
import LoginPage from "../pages/LoginPage";

jest.mock("axios");

beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.removeItem = jest.fn();
  Storage.prototype.clear = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("LoginPage", () => {
  const TEST_USERNAME = process.env.REACT_APP_TEST_USERNAME || "defaultUser";
  const TEST_PASSWORD = process.env.REACT_APP_TEST_PASSWORD || "defaultPass";

  it("renders the login form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("allows the user to type into the input fields", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");


    fireEvent.change(usernameInput, { target: { value: TEST_USERNAME } });
    fireEvent.change(passwordInput, { target: { value: TEST_PASSWORD  } });

    expect(usernameInput).toHaveValue(TEST_USERNAME);
    expect(passwordInput).toHaveValue(TEST_PASSWORD);
  });

  it("displays an error message on invalid login", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "invalid_user" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "invalid_password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
  
    const errorMessage = await screen.findByText((content) =>
      content.includes("Login failed")
    );
    expect(errorMessage).toBeInTheDocument();
  });
  
  it("redirects to home on successful login", async () => {
    const mockToken = 'mock_token';
    
    (axios.post as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: { token: mockToken },
    });

    const usernameFromEnv = process.env.REACT_APP_TEST_USERNAME;
    const passwordFromEnv = process.env.REACT_APP_TEST_PASSWORD;

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Enter username');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByText('Login');

    fireEvent.change(usernameInput, { target: { value: usernameFromEnv || '' } });
    fireEvent.change(passwordInput, { target: { value: passwordFromEnv || '' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    });
  });
});