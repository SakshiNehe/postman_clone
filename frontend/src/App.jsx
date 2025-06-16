import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";
import RequestHistory from "./components/RequestHistory";  // ✅ Updated import
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  const [response, setResponse] = useState(null);
  const [lastRequest, setLastRequest] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-primary-dark text-white">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-4 gap-4 p-4">
                <div className="col-span-1">
                  <RequestHistory />  {/* ✅ Use Redux-based history */}
                </div>
                <div className="col-span-3 space-y-4">
                  <RequestForm setResponse={setResponse} setLastRequest={setLastRequest} />
                  <ResponseViewer response={response} request={lastRequest} />
                </div>
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
