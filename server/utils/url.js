const { URL } = require('url');

function isValidUrl(input) {
  try {
    const parsed = new URL(input);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function normalizeUrl(input) {
  return input.trim();
}

module.exports = {
  isValidUrl,
  normalizeUrl,
};
