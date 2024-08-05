import { useState } from 'react'
import ClientForm from './components/ClientForm';
import { useNavigate } from 'react-router-dom';
// import ClientForm from './components/ClientForm2';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './components/ListClient';

import './App.css'

function App() {

  return (
     
        <Router>
        <Routes>
    

<Route path="/" element={<ClientForm />} />
        <Route path="/lista" element={<List />} />
      
    
    </Routes>
    </Router>
    
  )
}

export default App
