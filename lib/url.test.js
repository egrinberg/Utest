const { testUrl } = require('./url');

describe('Urls responses tests', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Url with response status 200 should be considered as GOOD', async () => {
    const url = 'https://google.ca';
    const statusResponseForUrl = { url: `${url}`, status: `200` };
    fetch.mockResponseOnce('{ "id": 1 }', { status: 200 });

    const data = await testUrl(url);

    expect(data).toEqual(statusResponseForUrl);
  });

  test('Url with response status 400 should be considered as BAD', async () => {
    const url = 'https://google.ca';
    const statusResponseForUrl = { url: `${url}`, status: `400` };
    fetch.mockResponseOnce('{ "id": 1 }', { status: 400 });

    const data = await testUrl(url);

    expect(data).toEqual(statusResponseForUrl);
  });

  test('Url with response status 404 should be considered as BAD', async () => {
    const url = 'https://google.ca';
    const statusResponseForUrl = { url: `${url}`, status: `404` };
    fetch.mockResponseOnce('{ "id": 1 }', { status: 404 });

    const data = await testUrl(url);

    expect(data).toEqual(statusResponseForUrl);
  });

  test('Url with no response should be considered as UNKNOWN', async () => {
    const url = 'https://google.ca';
    const statusResponseForUrl = { url: `${url}`, status: `UNKNOWN` };
    fetch.mockReject(new Error('errors'));

    const data = await testUrl(url);

    expect(data).toEqual(statusResponseForUrl);
  });

  test('Url with response status 500 should be considered as 500', async () => {
    const url = 'https://google.ca';
    const statusResponseForUrl = { url: `${url}`, status: `500` };
    fetch.mockResponseOnce('{ "id": 1 }', { status: 500 });

    const data = await testUrl(url);

    expect(data).toEqual(statusResponseForUrl);
  });
});
