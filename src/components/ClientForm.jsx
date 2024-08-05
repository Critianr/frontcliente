import React, { useState, useEffect } from 'react';


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
      }, // Asegúrate de que este campo esté inicializado
    estado: '',    // Asegúrate de que este campo esté inicializado
  });
  const [ciudades, setCiudades] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:8080/ciudades')
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
  const edad = calcularEdad(cliente.fechaNacimiento);
  console.log("Edad calculada:", edad); // Para depuración
  // Corrigiendo la lógica de la viabilidad
  const estado = (edad >= 18 && edad <= 65) ? 'viable' : 'no viable';

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
  // const handleSubmit = (e) => {
    
  //   e.preventDefault();
  //   const edad = calcularEdad(cliente.fecha_nacimiento);

  //   const estado = (edad >= 18 && edad <= 65) ? 'viable' : 'no viable';
  //   const updatedCliente = { ...cliente, estado };
  //   console.log("Cliente antes de enviar:", updatedCliente); // Para depuración

  //   fetch('http://localhost:8080/api/clientes', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedCliente),
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
        type="date"
        name="fechaNacimiento"
        placeholder="Fecha de Nacimiento"
        value={cliente.fechaNacimiento}
        onChange={handleChange}
        required
      />
      <div>
        <label>Ciudad:</label>
        <select name="ciudad" value={cliente.ciudad} onChange={handleChange} required>
          <option value="">Seleccione una ciudad</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad.nombre} value={ciudad.nombre}>{ciudad.nombre}</option>
          ))}
        </select>
      </div>
      <input
        type="text"
        name="correoElectronico"
        placeholder="Correo Electrónico"
        value={cliente.correoElectronico}
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
      <label>Ocupación</label>
      <select
        name="ocupacion"
        value={cliente.ocupacion.tipo}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione una opción</option>
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
