import { useState } from 'react'
import ClientForm from './components/ClientForm';
// import ClientForm from './components/ClientForm2';

import './App.css'

function App() {

  return (
    <>
    <div className="App">
      <h1>PRUEBA PRÁCTICA PARA EL CARGO DE INGENIERO DESARROLLADOR JAVA</h1>
      <p>Debe realizar una aplicación web que permita realizar las operaciones básicas (CRUD) sobre
un cliente.</p>
<p>Adicionalmente se debe crear una funcionalidad que después del registro almacene en base de
datos si el cliente es viable, el criterio para determinar su viabilidad es que se encuentre en edad
productiva (entre los 18 y 65 años)</p>

      <ClientForm />
    </div>
    </>
  )
}

export default App
