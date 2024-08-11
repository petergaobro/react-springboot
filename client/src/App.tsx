import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MessageBoard from './components/MessageBoard';
import MessageDetail from './components/SingleMessage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MessageBoard />} />
        <Route path="/message/:id" element={<MessageDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
