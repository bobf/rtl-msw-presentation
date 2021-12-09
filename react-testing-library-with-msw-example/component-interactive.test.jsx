import React, { useState } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';

const MyComponent = ({ initialMessage }) => {
  const [message, setMessage] = useState(initialMessage);

  return (
    <>
      <h1 role="heading">{message}</h1>
      <button onClick={() => setMessage('Goodbye')}>Click Me</button>
    </>
  );
}

describe('MyComponent', () => {
  it('updates heading after clicking button', async () => {
    render(<MyComponent initialMessage="Hello" />);

    fireEvent.click(screen.getByText('Click Me'));

    expect(await screen.findByText('Goodbye')).toBeInTheDocument();
  });
});

