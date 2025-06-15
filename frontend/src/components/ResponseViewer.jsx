import React, { useState } from "react";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register language
SyntaxHighlighter.registerLanguage('json', json);

const ResponseViewer = ({ response }) => {
  const [activeTab, setActiveTab] = useState('body');

  console.log("ResponseViewer received response:", response);
  console.log("ResponseViewer received response.time:", response?.time);

  // Early return if no response
  if (!response) {
    return (
      <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
        <div className="p-4 text-center text-gray-400">
          No response data available
        </div>
      </div>
    );
  }

  const formatResponseTime = (time) => {
    return `${time}ms`;
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 300 && status < 400) return 'text-yellow-500';
    if (status >= 400) return 'text-red-500';
    return 'text-gray-500';
  };

  const formatHeaders = (headers) => {
    if (!headers) return null;
    return Object.entries(headers).map(([key, value]) => (
      <div key={key} className="flex py-1 border-b border-gray-700">
        <span className="font-semibold w-1/3">{key}:</span>
        <span className="w-2/3">{value}</span>
      </div>
    ));
  };

  const formatResponseBody = (data, contentType) => {
    if (!data) return '';
    if (typeof data === 'string') {
      try {
        // Try to parse as JSON for better formatting
        const parsed = JSON.parse(data);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return data;
      }
    }
    return JSON.stringify(data, null, 2);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
      {/* Response Status Bar */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className={`text-lg font-semibold ${getStatusColor(response.status)}`}>
            {response.status} {response.statusText || ''}
          </span>
          <span className="text-gray-400">{formatResponseTime(response.time)}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('body')}
            className={`px-3 py-1 rounded ${
              activeTab === 'body' ? 'bg-accent-blue' : 'bg-gray-700'
            }`}
          >
            Body
          </button>
          <button
            onClick={() => setActiveTab('headers')}
            className={`px-3 py-1 rounded ${
              activeTab === 'headers' ? 'bg-accent-blue' : 'bg-gray-700'
            }`}
          >
            Headers
          </button>
        </div>
      </div>

      {/* Response Content */}
      <div className="p-4">
        {activeTab === 'body' ? (
          <div className="overflow-auto max-h-[500px]">
            <SyntaxHighlighter
              language="json"
              style={vs2015}
              customStyle={{ margin: 0, borderRadius: '0.5rem' }}
            >
              {formatResponseBody(response.data, response.headers?.['content-type'])}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className="space-y-2">
            {formatHeaders(response.headers) || (
              <div className="text-gray-400 text-center py-4">No headers available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseViewer;
