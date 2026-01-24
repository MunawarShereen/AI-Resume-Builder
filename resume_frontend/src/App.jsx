import './App.css'
import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Builder from './pages/Builder';

function App() {
  // Simple state-based routing for demonstration
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToBuilder = () => setCurrentPage('builder');

  return (
    <MainLayout>
      {currentPage === 'home' && <Home onStart={navigateToBuilder} />}
      {currentPage === 'builder' && <Builder />}
    </MainLayout>
  );
}

export default App;