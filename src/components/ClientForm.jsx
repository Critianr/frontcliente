import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientForm = () => {
  const [cliente, setCliente] = useState({
    numeroDocumento: '',
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    ciudad: '',
    correoElectronico: '',
    telefono: '',
      ocupacion: {
        tipo: ""
      }, 
    estado: '', 
  });
  const [ciudades, setCiudades] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/ciudades.json') // 
      .then(response => response.json())
      .then(data => setCiudades(data))
      .catch(error => console.error('Error fetching ciudades:', error));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
 const calcularEdad = (fechaNacimiento) => {
   const fecha = new Date(fechaNacimiento);
   const hoy = new Date();
   let edad = hoy.getFullYear() - fecha.getFullYear();
   const m = hoy.getMonth() - fecha.getMonth();
   if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
     edad--;
   }
   return edad;
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  let validationErrors = {};
  const edad = calcularEdad(cliente.fechaNacimiento);
  console.log("Edad calculada:", edad); // Para depuración
  // Corrigiendo la lógica de la viabilidad
  const estado = (edad >= 18 && edad <= 65) ? 'viable' : 'no viable';
   // Validaciones
   if (!validateEmail(cliente.correoElectronico)) {
    validationErrors.correoElectronico = 'Por favor, ingresa un correo electrónico válido.';
  }
  const updatedCliente = { ...cliente, estado };
  console.log("Cliente antes de enviar:", updatedCliente); // Para depuración

  fetch('http://localhost:8080/api/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCliente),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then((result) => {
      console.log("Respuesta del servidor:", result); // Para depuración
      if (result && result.success !== undefined) {
        setMessage('Cliente guardado exitosamente.');
      } else {
        setMessage(`Cliente guardado exitosamente.`);
        // setMessage(`Error: ${result.message || 'Error desconocido.'}`);
      }
    })
    .catch((error) => {
      console.error("Error al conectar con el servidor:", error); // Para depuración
      setMessage('Error al conectar con el servidor.');
    });
};

  return (
    <>
    <div>
    <h1>PRUEBA PRÁCTICA PARA EL CARGO DE INGENIERO DESARROLLADOR JAVA</h1>
      <p>Debe realizar una aplicación web que permita realizar las operaciones básicas (CRUD) sobre
un cliente.</p>
<p>Adicionalmente se debe crear una funcionalidad que después del registro almacene en base de
datos si el cliente es viable, el criterio para determinar su viabilidad es que se encuentre en edad
productiva (entre los 18 y 65 años)</p>
    
    </div>
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="form-group mb-3">
        <label htmlFor="numeroDocumento">Número de Documento</label>
        <input
          type="text"
          className="form-control"
          id="numeroDocumento"
          name="numeroDocumento"
          placeholder="Número de Documento"
          value={cliente.numeroDocumento}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          value={cliente.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="apellidos">Apellidos</label>
        <input
          type="text"
          className="form-control"
          id="apellidos"
          name="apellidos"
          placeholder="Apellidos"
          value={cliente.apellidos}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
        <input
          type="date"
          className="form-control"
          id="fechaNacimiento"
          name="fechaNacimiento"
          value={cliente.fechaNacimiento}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="ciudad">Ciudad</label>
        <select 
          id="ciudad"
          name="ciudad"
          className="form-select"
          value={cliente.ciudad} 
          onChange={handleChange} 
          required
        >
          <option value="">Seleccione una ciudad</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad.nombre} value={ciudad.nombre}>{ciudad.nombre}</option>
          ))}
        </select>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="correoElectronico">Correo Electrónico</label>
        <input
          type="email"
          className="form-control"
          id="correoElectronico"
          name="correoElectronico"
          placeholder="Correo Electrónico"
          value={cliente.correoElectronico}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          className="form-control"
          id="telefono"
          name="telefono"
          placeholder="Teléfono"
          value={cliente.telefono}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="ocupacion">Ocupación</label>
        <select
          id="ocupacion"
          name="ocupacion"
          className="form-select"
          value={cliente.ocupacion.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="Empleado">Empleado</option>
          <option value="Independiente">Independiente</option>
          <option value="Pensionado">Pensionado</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Guardar Cliente</button>
      <button type="button" onClick={() => navigate('/lista')}>Ir a clientes</button>
      <p className="mt-3">{message}</p>
    </form>
    </>
  );
};

export default ClientForm;
