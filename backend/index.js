import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

app.use(cors());

// Configure multer for memory storage (for file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Template API
const apiTemplates = {
  'https://api.example.com/users': {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30
    }
  },
  'https://api.example.com/products': {
    method: 'GET',
    headers: {},
    body: null
  },
};

app.get('/api/suggest-template', (req, res) => {
  const apiIdentifier = req.query.apiIdentifier;
  const template = apiTemplates[apiIdentifier] || {};
  res.json(template);
});

// Send API Request with File/Body
app.post('/api/send-request', upload.single('file'), async (req, res) => {
  const startTime = process.hrtime.bigint();
  try {
    const { url, method, headers } = req.body;
    let body;

    if (req.file) {
      body = req.file.buffer;
    } else {
      try {
        body = JSON.parse(req.body.body);
      } catch (e) {
        body = req.body.body;
      }
    }

    const response = await fetch(url, {
      method,
      headers: headers ? JSON.parse(headers) : {},
      body: ['GET', 'HEAD'].includes(method) ? undefined : body
    });

    const contentType = response.headers.get('content-type');
    const rawText = await response.text();

    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1_000_000;

    res.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: contentType?.includes('application/json') ? JSON.parse(rawText) : rawText,
      time: duration
    });
  } catch (error) {
    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1_000_000;
    res.status(500).json({ error: error.message, time: duration });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
