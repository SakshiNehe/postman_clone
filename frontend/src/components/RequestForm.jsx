import React, { useState } from "react";

const RequestForm = ({ setResponse, setLastRequest }) => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);

  // Define API descriptions
  const apiDescriptions = {
    'https://api.example.com/users': 'This API endpoint is used to manage user data, allowing creation, retrieval, update, and deletion of user records.',
    'https://api.example.com/products': 'This endpoint provides access to product catalog information, supporting operations like listing products, viewing details, and updating stock.',
    // Add more API descriptions here as needed
  };

  const sendRequest = async () => {
    const currentHeaders = file ? {} : { "Content-Type": "application/json" };

    const requestDetails = {
      url,
      method,
      headers: currentHeaders,
      body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
      file: file ? file.name : undefined
    };
    setLastRequest(requestDetails);

    try {
      let fetchOptions = {
        method,
      };

      if (file) {
        const formData = new FormData();
        formData.append('url', url);
        formData.append('method', method);
        formData.append('headers', JSON.stringify(currentHeaders));
        formData.append('file', file);
        if (method !== 'GET' && method !== 'HEAD' && body) {
          formData.append('body', body);
        }
        fetchOptions.body = formData;
      } else {
        fetchOptions.headers = currentHeaders;
        if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
          fetchOptions.body = body;
        }
      }

      const res = await fetch("http://localhost:5000/api/send-request", fetchOptions);

      const data = await res.json();
      setResponse(data);

      const newEntry = {
        url,
        method,
        body: method !== "GET" ? body : null,
        timestamp: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("requestHistory")) || [];
      existing.unshift(newEntry);
      localStorage.setItem("requestHistory", JSON.stringify(existing));
    } catch (error) {
      setResponse({ error: error.message });
    }
  };

  const suggestTemplate = async () => {
    if (!url) {
      alert("Please enter an API URL to suggest a template.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/suggest-template?apiIdentifier=${encodeURIComponent(url)}`);
      const template = await res.json();

      if (Object.keys(template).length > 0) {
        setMethod(template.method || "GET");
        setBody(template.body ? JSON.stringify(template.body, null, 2) : "");
      } else {
        alert("No template found for this API URL. Try 'https://api.example.com/users' or 'https://api.example.com/products'.");
      }
    } catch (error) {
      alert(`Failed to fetch template: ${error.message}`);
    }
  };

  const currentApiDescription = apiDescriptions[url] || ''; // Get description based on current URL

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-white">
      <div className="flex gap-3 mb-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:ring-accent-blue focus:border-accent-blue outline-none"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter API URL"
          className="flex-grow border border-gray-600 bg-gray-700 text-white p-2 rounded-md focus:ring-accent-blue focus:border-accent-blue outline-none placeholder-gray-400"
        />
        <button
          onClick={sendRequest}
          className="bg-accent-blue text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-500 transition-colors duration-300"
        >
          Send
        </button>
        <button
          onClick={suggestTemplate}
          className="bg-gray-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300"
        >
          Suggest Template
        </button>
      </div>
      {currentApiDescription && (
        <p className="text-gray-400 text-sm mb-4">{currentApiDescription}</p> // Display description
      )}

      {method !== "GET" && method !== "HEAD" && ( // Show body/file input for non-GET/HEAD methods
        <div className="mb-4">
          <textarea
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='Enter JSON body'
            className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-md font-mono focus:ring-accent-blue focus:border-accent-blue outline-none placeholder-gray-400"
          />
          <label className="block mt-2 text-sm font-medium">
            Upload File (optional):
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-blue file:text-white hover:file:bg-blue-500"
            />
            {file && <p className="text-gray-400 text-xs mt-1">Selected: {file.name}</p>}
          </label>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
