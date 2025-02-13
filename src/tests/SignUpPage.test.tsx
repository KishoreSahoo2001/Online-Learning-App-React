import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import React from 'react'; 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpPage from "../pages/SignUpPage";
import { MemoryRouter } from 'react-router-dom';
import api from '../interceptor/api';

jest.mock('../interceptor/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  interceptors: { request: { use: jest.fn() } },
}));

describe('SignUpPage', () => {
  const testUsername = process.env.REACT_APP_TEST_USERNAME_SIGNUP;
  const testEmail = process.env.REACT_APP_TEST_EMAIL_SIGNUP;
  const testPassword = process.env.REACT_APP_TEST_PASSWORD_SIGNUP;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the SignUpPage component', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email id')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  test('submitting the form with valid data', async () => {
    const postSpy = jest.spyOn(api, 'post').mockResolvedValueOnce({ data: { token: "test-token" } });
  
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
  
    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: testUsername } });
    fireEvent.change(screen.getByPlaceholderText('Enter email id'), { target: { value: testEmail } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: testPassword } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: testPassword } });
  
    fireEvent.click(screen.getByText('Sign Up'));
  
    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith('/auth/signup', {
        username: testUsername,
        email: testEmail,
        password: testPassword,
      });
    });
  
    postSpy.mockRestore();
  });
  

  test('handles empty input values properly', async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter email id')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    });
  });
});