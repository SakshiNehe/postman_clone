import React, { useEffect, useState } from "react";

const HistoryPanel = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("requestHistory")) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl h-full text-white">
      <h2 className="font-bold text-xl mb-4">Request History</h2>
      <div className="space-y-3 text-sm">
        {history.length === 0 && <p className="text-gray-400">No history yet. Send a request to see it here!</p>}
        {history.map((item, index) => (
          <div key={index} className="bg-gray-700 p-3 rounded-md border border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors duration-200">
            <div className="font-semibold text-accent-blue">{item.method} <span className="text-white">-</span> {item.url}</div>
            <div className="text-xs text-gray-400 mt-1">{new Date(item.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
