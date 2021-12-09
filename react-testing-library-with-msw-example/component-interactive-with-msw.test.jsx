import React, { useState } from 'react';
import '@testing-library/jest-dom/extend-expect';
import fetch from 'node-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';

const testURL = 'http://example.com/example';

const server = setupServer(
  rest.get(testURL, (req, res, ctx) => res(ctx.json({ message: 'Message from the web' }))),
);

const fetchMessage = () => fetch(testURL).then(response => response.json());

const MyComponent = ({ initialMessage }) => {
  const [message, setMessage] = useState(initialMessage);

  return (
    <>
      <h1 role="heading">{message}</h1>
      <button onClick={() => fetchMessage().then(json => setMessage(json.message))}>Click Me</button>
    </>
  );
}

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('MyComponent', () => {
  it('updates heading after clicking button', async () => {
    render(<MyComponent initialMessage="Hello" />);

    fireEvent.click(screen.getByText('Click Me'));

    expect(await screen.findByText('Message from the web')).toBeInTheDocument();
  });
});
