import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

const MyComponent = ({ initialMessage }) => (
  <h1 role="heading">{initialMessage}</h1>
);

describe('MyComponent', () => {
  it('contains expected heading', () => {
    render(<MyComponent initialMessage="Hello" />);

    expect(screen.getByRole('heading')).toHaveTextContent('Hello');
  });
});
