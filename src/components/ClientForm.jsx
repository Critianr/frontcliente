import React, { useState } from 'react';

const ClientForm = () => {
  const [cliente, setcliente] = useState({
    numero_documento: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: '',
    ciudad: '',
    correo_electronico: '',
    telefono: '',
    ocupacion: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setcliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaNacimiento = parseInt(cliente.fecha_nacimiento, 10);

    if (fechaNacimiento >= 18 && fechaNacimiento <= 65) {
      setIsValid(true);
      fetch('http://localhost:8080/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            setMessage('Cliente guardado exitosamente.');
          } else {
            setMessage(`Error: ${result.message}`);
          }
        })
        .catch(error => {
          setMessage('Error al conectar con el servidor.');
        });
    } else {
      setIsValid(false);
      setMessage('El cliente no está en edad productiva (18-65 años).');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Number of Document</label>
        <input
          type="text"
          name="numero_documento"
          value={cliente.numero_documento}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="nombre"
          value={cliente.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="apellidos"
          value={cliente.apellidos}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Age</label>
        <input
          type="number"
          name="fecha_nacimiento"
          value={cliente.fecha_nacimiento}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          name="ciudad"
          value={cliente.ciudad}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="correo_electronico"
          value={cliente.correo_electronico}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="telefono"
          value={cliente.telefono}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Occupation</label>
        <select
          name="ocupacion"
          value={cliente.ocupacion}
          onChange={handleChange}
          required
        >
          <option value="Empleado">Empleado</option>
          <option value="Independiente">Independiente</option>
          <option value="Pensionado">Pensionado</option>
        </select>
      </div>
      <button type="submit">Submit</button>
      {!isValid && <p className="error">Client is not in the productive age range.</p>}
    </form>
  );
};

export default ClientForm;