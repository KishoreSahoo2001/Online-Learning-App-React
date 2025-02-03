// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress React Router warnings in tests
jest.spyOn(console, "warn").mockImplementation((message) => {
  if (
    message.includes("React Router Future Flag Warning") ||
    message.includes("Relative route resolution within Splat routes")
  ) {
    return;
  }
  console.warn(message);
});

// Mock localStorage globally
global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(() => null),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0, // Mock length
  key: jest.fn(() => null), // Mock key method
};