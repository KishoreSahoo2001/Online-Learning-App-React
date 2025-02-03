import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/HomePage';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('HomePage', () => {
  test('renders the HomePage component', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome to the Online Learning Platform')).toBeInTheDocument();
    expect(screen.getByText('Your learning journey begins here!')).toBeInTheDocument();
  });

  test('renders Featured Courses section with links', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Featured Courses')).toBeInTheDocument();
    expect(screen.getByText('Introduction to Programming')).toBeInTheDocument();
    expect(screen.getByText('Advanced Web Development')).toBeInTheDocument();
    expect(screen.getByText('Data Science with Python')).toBeInTheDocument();
  });

  test('renders Popular Categories section with links', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Popular Categories')).toBeInTheDocument();
    expect(screen.getByText('Programming')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Data Science')).toBeInTheDocument();
  });

  test('navigating to the correct course page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:id" element={<div>Course Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Introduction to Programming'));

    expect(screen.getByText('Course Page')).toBeInTheDocument();
  });

  test('navigating to the correct category page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<div>Category Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Programming'));

    expect(screen.getByText('Category Page')).toBeInTheDocument();
  });
});