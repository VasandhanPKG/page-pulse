const request = require('supertest');
const axios = require('axios');
const app = require('../app');

jest.mock('axios');

describe('POST /api/audit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns audit data for a valid HTML page', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
      data: `<!doctype html><html><head><title>Example Page</title><meta name="description" content="Example description" /></head><body><h1>Welcome</h1><h1>Again</h1><img src="/one.png" /><img src="/two.png" alt="Two" /></body></html>`,
    });

    const response = await request(app)
      .post('/api/audit')
      .send({ url: 'https://example.com' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 200,
        responseTime: expect.stringMatching(/ms$/),
        title: 'Example Page',
        metaDescription: 'Example description',
        h1Count: 2,
        missingAltImages: 1,
        wordCount: expect.any(Number),
      })
    );
  });

  it('rejects invalid URLs', async () => {
    const response = await request(app)
      .post('/api/audit')
      .send({ url: 'not-a-url' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid URL' });
  });

  it('returns timeout/network failure error response', async () => {
    axios.get.mockRejectedValueOnce({
      code: 'ETIMEDOUT',
      message: 'timeout of 5000ms exceeded',
    });

    const response = await request(app)
      .post('/api/audit')
      .send({ url: 'https://example.com/slow' });

    expect(response.status).toBe(408);
    expect(response.body).toEqual({ error: 'Request timed out.' });
  });

  it('rejects non-HTML responses', async () => {
    const response = await request(app)
      .post('/api/audit')
      .send({ url: 'https://example.com/logo.png' });

    expect(response.status).toBe(415);
    expect(response.body).toEqual({ error: 'URL does not contain an HTML page.' });
  });
});
