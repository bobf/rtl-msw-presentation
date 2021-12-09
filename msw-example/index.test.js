import fetch from 'node-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const testURL = 'http://example.com/example';

const server = setupServer(
  rest.get(testURL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ exampleContent: 'hello' }),
    );
  }),
  // rest.post(testURL, (req, res, ctx) => res(ctx.status(201))),
);

describe('GET request without MSW', () => {
  it('responds with 404 Not Found', async () => {
    expect((await fetch(testURL)).status).toEqual(404);
  });

  it('responds with expected content', async () => {
    expect(await (await fetch(testURL)).text()).toMatch('Example Domain');
  });
});

describe('GET request with MSW', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('responds with 200 OK', async () => {
    expect((await fetch(testURL)).status).toEqual(200);
  });

  it('responds with example JSON content', async () => {
    expect(await (await fetch(testURL)).json()).toEqual({ exampleContent: 'hello' });
  });
});

// describe('POST request with MSW', () => {
//   beforeAll(() => server.listen());
//   afterAll(() => server.close());
//   afterEach(() => server.resetHandlers());
//
//   it('responds with 201 Created', async () => {
//     expect((await fetch(testURL, { method: 'POST' })).status).toEqual(201);
//   });
// });
