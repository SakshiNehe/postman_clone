import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRequest } from '../store/historySlice';
import ResponseViewer from './ResponseViewer';
import RequestHistory from './RequestHistory';

const ApiTester = () => {
  const dispatch = useDispatch();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendRequest = async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      // Convert headers array to object
      const headersObj = headers.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {});

      // Prepare request options
      const options = {
        method,
        headers: {
          ...headersObj,
          // Add Content-Type for non-GET requests with body
          ...(method !== 'GET' && body && {
            'Content-Type': 'application/json'
          })
        },
      };

      // Add body for non-GET requests
      if (method !== 'GET' && body) {
        try {
          options.body = JSON.stringify(JSON.parse(body));
        } catch (e) {
          options.body = body;
        }
      }

      // Make the request
      const fetchedResponse = await fetch(url, options);
      const endTime = performance.now();

      // Get response headers
      const responseHeaders = {};
      fetchedResponse.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Try to parse response as JSON, fallback to text
      let responseData;
      const contentType = fetchedResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          responseData = await fetchedResponse.json();
        } catch (e) {
          // If JSON parsing fails, treat as text
          responseData = await fetchedResponse.text();
          setError('Failed to parse JSON response. Showing as plain text.');
        }
      } else {
        responseData = await fetchedResponse.text();
      }

      const responseInfo = {
        status: fetchedResponse.status,
        statusText: fetchedResponse.statusText,
        headers: responseHeaders,
        data: responseData !== undefined ? responseData : '', // Ensure data is not undefined
        time: Math.round(endTime - startTime) || 0, // Ensure time is a number
      };

      setResponse(responseInfo);

      // Save to history
      dispatch(
        addRequest({
          method,
          url,
          headers: headersObj,
          body: method !== 'GET' ? body : undefined,
          ...responseInfo,
        })
      );
    } catch (error) {
      const endTime = performance.now();
      setError(error.message);
      setResponse({
        status: 0,
        statusText: 'Error',
        headers: {},
        data: { error: error.message },
        time: Math.round(endTime - startTime) || 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const removeHeader = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Request History Sidebar */}
      <div className="w-80 border-r border-gray-800">
        <RequestHistory />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Request Controls */}
          <div className="flex space-x-4">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded"
            />
            <button
              onClick={handleSendRequest}
              disabled={loading || !url}
              className="bg-accent-blue text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900 text-white p-4 rounded">
              Error: {error}
            </div>
          )}

          {/* Headers */}
          <div className="bg-gray-800 rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Headers</h3>
              <button
                onClick={addHeader}
                className="text-accent-blue hover:text-blue-400"
              >
                + Add Header
              </button>
            </div>
            {headers.map((header, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => updateHeader(index, 'key', e.target.value)}
                  placeholder="Key"
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => updateHeader(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded"
                />
                <button
                  onClick={() => removeHeader(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Request Body */}
          {method !== 'GET' && (
            <div className="bg-gray-800 rounded p-4">
              <h3 className="text-lg font-semibold mb-4">Request Body</h3>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter request body (JSON)"
                className="w-full h-40 bg-gray-700 text-white px-3 py-2 rounded font-mono"
              />
            </div>
          )}

          {/* Response */}
          {response && <ResponseViewer response={response} />}
        </div>
      </div>
    </div>
  );
};

export default ApiTester; 