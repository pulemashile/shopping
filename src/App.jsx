import React from 'react';
import ItemForm from './AddItemform';
import ItemList from './ItemList';
import Loginpage from './loginpage';
import RegistrationPage from './Registrationpage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemPage from './ItemComponent';
import "./App.css"

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Loginpage />} />
          <Route path="/register" element={<RegistrationPage />} />

          <Route path="/add" element={<ItemPage />} />

          
                  
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
