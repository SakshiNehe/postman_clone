import React, { useState } from "react";

const RequestForm = ({ setResponse, setLastRequest }) => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);

  const apiDescriptions = {
    'https://api.example.com/users': 'This API endpoint is used to manage user data.',
    'https://api.example.com/products': 'This endpoint provides product catalog information.',
  };

  const sendRequest = async () => {
    const headers = file ? {} : { "Content-Type": "application/json" };

    const requestDetails = {
      url,
      method,
      headers,
      body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
      file: file ? file.name : undefined
    };
    setLastRequest(requestDetails);

    try {
      let fetchOptions = {
        method: "POST",
        body: null
      };

      const formData = new FormData();
      formData.append('url', url);
      formData.append('method', method);
      formData.append('headers', JSON.stringify(headers));
      if (file) {
        formData.append('file', file);
      }
      if (method !== 'GET' && method !== 'HEAD' && body) {
        formData.append('body', body);
      }

      fetchOptions.body = formData;

      const res = await fetch("http://localhost:5000/api/send-request", fetchOptions);
      const data = await res.json();
      setResponse(data);

      const history = JSON.parse(localStorage.getItem("requestHistory")) || [];
      history.unshift({ url, method, body, timestamp: new Date().toISOString() });
      localStorage.setItem("requestHistory", JSON.stringify(history));
    } catch (error) {
      setResponse({ error: error.message });
    }
  };

  const suggestTemplate = async () => {
    if (!url) {
      alert("Please enter an API URL.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/suggest-template?apiIdentifier=${encodeURIComponent(url)}`);
      const template = await res.json();

      if (Object.keys(template).length > 0) {
        setMethod(template.method || "GET");
        setBody(template.body ? JSON.stringify(template.body, null, 2) : "");
      } else {
        alert("No template found.");
      }
    } catch (err) {
      alert("Error fetching template.");
    }
  };

  const currentApiDescription = apiDescriptions[url] || "";

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-white">
      <div className="flex gap-3 mb-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="bg-gray-700 text-white p-2 rounded-md">
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
          className="flex-grow bg-gray-700 text-white p-2 rounded-md"
        />
        <button onClick={sendRequest} className="bg-accent-blue px-4 py-2 rounded-md font-semibold">
          Send
        </button>
        <button onClick={suggestTemplate} className="bg-gray-600 px-4 py-2 rounded-md font-semibold">
          Suggest Template
        </button>
      </div>
      {currentApiDescription && <p className="text-gray-400 text-sm mb-4">{currentApiDescription}</p>}
      {method !== "GET" && method !== "HEAD" && (
        <div className="mb-4">
          <textarea
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter JSON body"
            className="w-full bg-gray-700 text-white p-2 rounded-md font-mono"
          />
          <label className="block mt-2 text-sm">
            Upload File:
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block mt-1 text-sm text-white"
            />
            {file && <p className="text-xs mt-1 text-gray-400">Selected: {file.name}</p>}
          </label>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
