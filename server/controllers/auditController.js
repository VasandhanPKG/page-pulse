const { auditWebsite } = require('../services/auditService');

async function auditController(req, res) {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const result = await auditWebsite(url);
    return res.status(200).json(result);
  } catch (error) {
    if (error.code === 'INVALID_URL') {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    if (error.code === 'TIMEOUT') {
      return res.status(408).json({ error: 'Request timed out.' });
    }

    if (error.code === 'NON_HTML') {
      return res.status(415).json({ error: 'URL does not contain an HTML page.' });
    }

    if (error.code === 'UNREACHABLE') {
      return res.status(502).json({ error: 'Unable to reach website.' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  auditController,
};
