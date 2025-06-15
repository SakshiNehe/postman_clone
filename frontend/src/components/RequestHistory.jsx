import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRequest, clearHistory } from '../store/historySlice';

const RequestHistory = () => {
  const dispatch = useDispatch();
  const { requests, selectedRequest } = useSelector((state) => state.history);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: 'bg-green-500',
      POST: 'bg-blue-500',
      PUT: 'bg-yellow-500',
      DELETE: 'bg-red-500',
      PATCH: 'bg-purple-500',
    };
    return colors[method] || 'bg-gray-500';
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 300 && status < 400) return 'text-yellow-500';
    if (status >= 400) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Request History</h2>
        <button
          onClick={() => dispatch(clearHistory())}
          className="text-sm text-gray-400 hover:text-white"
        >
          Clear History
        </button>
      </div>

      <div className="overflow-auto max-h-[600px]">
        {requests.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No requests yet</div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800 ${
                selectedRequest?.id === request.id ? 'bg-gray-800' : ''
              }`}
              onClick={() => dispatch(selectRequest(request))}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(
                      request.method
                    )}`}
                  >
                    {request.method}
                  </span>
                  <span className="text-sm truncate max-w-[200px]">{request.url}</span>
                </div>
                <span className="text-xs text-gray-400">{formatTime(request.timestamp)}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className={getStatusColor(request.status)}>
                  Status: {request.status}
                </span>
                <span className="text-gray-400">
                  Time: {request.time}ms
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestHistory; 