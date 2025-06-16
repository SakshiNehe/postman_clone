import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("json", json);

const ResponseViewer = ({ response }) => {
  const [activeTab, setActiveTab] = useState("body");

  if (!response) {
    return (
      <div className="bg-gray-900 text-white rounded-lg p-4 text-center text-gray-400">
        No response data available
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return "text-green-500";
    if (status >= 300 && status < 400) return "text-yellow-500";
    return "text-red-500";
  };

  const formatResponseBody = (data) => {
    if (!data) return "";
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return data;
      }
    }
    return JSON.stringify(data, null, 2);
  };

  const formatHeaders = (headers) =>
    headers
      ? Object.entries(headers).map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-gray-700 py-1">
            <span className="font-semibold">{k}</span>
            <span>{v}</span>
          </div>
        ))
      : null;

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className={`text-lg font-semibold ${getStatusColor(response.status)}`}>
            {response.status} {response.statusText}
          </span>
          <span className="text-gray-400">{Math.round(response.time)}ms</span>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setActiveTab("body")}
            className={`px-3 py-1 rounded ${
              activeTab === "body" ? "bg-accent-blue" : "bg-gray-700"
            }`}
          >
            Body
          </button>
          <button
            onClick={() => setActiveTab("headers")}
            className={`px-3 py-1 rounded ${
              activeTab === "headers" ? "bg-accent-blue" : "bg-gray-700"
            }`}
          >
            Headers
          </button>
        </div>
      </div>
      <div className="p-4 overflow-auto max-h-[500px]">
        {activeTab === "body" ? (
          <SyntaxHighlighter
            language="json"
            style={vs2015}
            customStyle={{ margin: 0, borderRadius: "0.5rem" }}
          >
            {formatResponseBody(response.body)}
          </SyntaxHighlighter>
        ) : (
          <div>{formatHeaders(response.headers)}</div>
        )}
      </div>
    </div>
  );
};

export default ResponseViewer;
