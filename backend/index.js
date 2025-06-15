import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import multer from 'multer';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Sample templates (optional feature)
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

// Main request forwarder
app.post('/api/send-request', upload.single('file'), async (req, res) => {
  const startTime = process.hrtime.bigint();

  try {
    const isFormData = req.headers['content-type']?.includes('multipart/form-data');

    let url, method, headers, body;

    if (isFormData) {
      url = req.body.url;
      method = req.body.method;
      headers = req.body.headers ? JSON.parse(req.body.headers) : {};

      if (req.file) {
        body = req.file.buffer;
      } else {
        try {
          body = req.body.body ? JSON.parse(req.body.body) : null;
        } catch {
          body = req.body.body;
        }
      }
    } else {
      // JSON request (e.g., from Postman)
      ({ url, method, headers, body } = req.body);
    }

    // Perform the actual API call
    const response = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
    });

    const contentType = response.headers.get('content-type');
    const textData = await response.text();

    const endTime = process.hrtime.bigint();
    const requestDuration = Number(endTime - startTime) / 1_000_000;

    let parsedBody;
    try {
      parsedBody = contentType?.includes('application/json') ? JSON.parse(textData) : textData;
    } catch {
      parsedBody = textData;
    }

    res.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: parsedBody,
      time: requestDuration,
    });

  } catch (error) {
    const endTime = process.hrtime.bigint();
    const requestDuration = Number(endTime - startTime) / 1_000_000;
    res.status(500).json({
      error: error.message,
      time: requestDuration,
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
