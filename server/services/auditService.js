const axios = require('axios');
const cheerio = require('cheerio');
const { isValidUrl, normalizeUrl } = require('../utils/url');

function isNonHtmlUrl(url) {
  const pathname = new URL(url).pathname;
  return /\.(png|jpe?g|gif|svg|webp|ico|pdf|zip|rar|gz|mp4|mp3|json|xml|js|css)(\?.*)?$/i.test(pathname);
}

async function auditWebsite(inputUrl) {
  const normalizedUrl = normalizeUrl(inputUrl);

  if (!isValidUrl(normalizedUrl)) {
    const error = new Error('Invalid URL');
    error.code = 'INVALID_URL';
    throw error;
  }

  if (isNonHtmlUrl(normalizedUrl)) {
    const error = new Error('URL does not contain an HTML page.');
    error.code = 'NON_HTML';
    throw error;
  }

  const startedAt = Date.now();

  try {
    const response = await axios.get(normalizedUrl, {
      responseType: 'text',
      timeout: Number(process.env.REQUEST_TIMEOUT_MS || 10000),
      maxRedirects: 5,
      headers: {
        'User-Agent': 'PagePulse/1.0',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    const responseTime = `${Date.now() - startedAt} ms`;
    const contentType = response.headers['content-type'] || '';

    if (!contentType.toLowerCase().includes('text/html')) {
      const error = new Error('URL does not contain an HTML page.');
      error.code = 'NON_HTML';
      throw error;
    }

    const $ = cheerio.load(response.data);
    const title = $('title').first().text().trim() || 'Untitled';
    const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
    const h1Count = $('h1').length;
    const missingAltImages = $('img').filter((_, el) => !$(el).attr('alt')).length;
    const wordCount = $('body')
      .text()
      .split(/\s+/)
      .filter(Boolean).length;

    return {
      status: response.status,
      responseTime,
      title,
      metaDescription,
      h1Count,
      missingAltImages,
      wordCount,
    };
  } catch (error) {
    if (error.code === 'INVALID_URL' || error.code === 'NON_HTML') {
      throw error;
    }

    if (
      error.code === 'ECONNABORTED' ||
      error.code === 'ETIMEDOUT' ||
      error.message?.toLowerCase().includes('timeout')
    ) {
      const timeoutError = new Error('Request timed out.');
      timeoutError.code = 'TIMEOUT';
      throw timeoutError;
    }

    if (error.response) {
      if (error.response.status >= 400) {
        const reachabilityError = new Error('Unable to reach website.');
        reachabilityError.code = 'UNREACHABLE';
        throw reachabilityError;
      }
    }

    if (error.message === 'Network Error') {
      const reachabilityError = new Error('Unable to reach website.');
      reachabilityError.code = 'UNREACHABLE';
      throw reachabilityError;
    }

    const unexpectedError = new Error('Internal Server Error');
    unexpectedError.code = 'INTERNAL_ERROR';
    throw unexpectedError;
  }
}

module.exports = {
  auditWebsite,
};
