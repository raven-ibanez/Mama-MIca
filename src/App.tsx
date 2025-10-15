import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './components/FAQ';
import ChatBot from './components/ChatBot';
import AdminFAQ from './components/AdminFAQ';

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <FAQ />
            <ChatBot />
          </>
        } />
        <Route path="/admin" element={<AdminFAQ />} />
      </Routes>
    </Router>
  );
}