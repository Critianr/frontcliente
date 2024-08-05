import { useState } from 'react'
import ClientForm from './components/ClientForm';
// import ClientForm from './components/ClientForm2';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lista from './components/Lista';

import './App.css'

function App() {

  return (
     
        <Router>
        <Routes>
    

<Route path="/" element={<ClientForm />} />
        <Route path="/lista" element={<Lista />} />
      
    
    </Routes>
    </Router>
    
  )
}

export default App
