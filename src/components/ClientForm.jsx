import React, { useState, useEffect } from 'react';

const ClientForm = () => {
  const [cliente, setcliente] = useState({
    numeroDocumento: '',
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    ciudad: '',
    correo_electronico: '',
    telefono: '',
    ocupacion: 'Empleado',
    estado: '',
  });
  // const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [shouldSubmit, setShouldSubmit] = useState(false);  
  const handleChange = (e) => {
    setcliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const calcularEdad = (fechaNacimiento) => {

    return fechaNacimiento >= 18 && fechaNacimiento <= 65;
  };
  useEffect(() => {
    if (shouldSubmit) {
      fetch('http://localhost:8080/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setMessage('Cliente guardado exitosamente.');
          } else {
            setMessage(`Error: ${result.message}`);
          }
        })
        .catch(() => {
          setMessage('Error al conectar con el servidor.');
        });
      setShouldSubmit(false); // Reset the submit flag
    }
  }, [shouldSubmit, cliente]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const edad = calcularEdad(cliente.fecha_nacimiento);
    console.log("Edad calculada:", edad); // Añadido para depuración

    const estado = (edad >= 18 && edad <= 65) ? 'no viable' : 'viable';
    console.log("Estado calculado:", estado); // Añadido para depuración

    setCliente((prevCliente) => ({
      ...prevCliente,
      estado,
    }));
    setShouldSubmit(true);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const edad = calcularEdad(cliente.fecha_nacimiento);

  //   if (edad >= 18 && edad <= 65) {
  //     cliente.estado = 'viable';
  //   } else {
  //     cliente.estado = 'no viable';
  //   }

  //   fetch('http://localhost:8080/api/clientes', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cliente),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.success) {
  //         setMessage('Cliente guardado exitosamente.');
  //       } else {
  //         setMessage(`Error: ${result.message}`);
  //       }
  //     })
  //     .catch(() => {
  //       setMessage('Error al conectar con el servidor.');
  //     });

  // };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="numeroDocumento"
        placeholder="Número de Documento"
        value={cliente.numeroDocumento}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={cliente.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        value={cliente.apellidos}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="fechaNacimiento"
        placeholder="Fecha de Nacimiento"
        value={cliente.fechaNacimiento}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="ciudad"
        placeholder="Ciudad"
        value={cliente.ciudad}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo_electronico"
        placeholder="Correo Electrónico"
        value={cliente.correo_electronico}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={cliente.telefono}
        onChange={handleChange}
        required
      />
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
      <button type="submit">Guardar Cliente</button>
      <p>{message}</p>
    </form>
  );
};

export default ClientForm;