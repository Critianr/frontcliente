import React, { useState, useEffect } from 'react';

const List = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    useEffect(() => {
      fetch('http://localhost:8080/api/clientes')
        .then((response) => response.json())
        .then((data) => setClientes(data))
        .catch((error) => console.error('Error fetching clientes:', error));
    }, []);
    const handleEdit = (cliente) => {
        setSelectedCliente(cliente);
        setShowModal(true);
      };
    
      const handleClose = () => {
        setShowModal(false);
        setSelectedCliente(null);
      };
    const handleDelete = (numeroDocumento) => {
        fetch(`http://localhost:8080/api/clientes/${numeroDocumento}`, {
          method: 'DELETE',
        })
          .then(() => {
            setClientes(clientes.filter(cliente => cliente.numeroDocumento !== numeroDocumento));
          })
          .catch((error) => console.error('Error deleting cliente:', error));
      };
      const handleSave = (cliente) => {
        fetch(`http://localhost:8080/api/clientes/${cliente.numeroDocumento}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cliente),
        })
          .then((response) => response.json())
          .then((updatedCliente) => {
            setClientes(clientes.map(c =>
              c.numeroDocumento === updatedCliente.numeroDocumento ? updatedCliente : c
            ));
            setSelectedCliente(null);
          })
          .catch((error) => console.error('Error updating cliente:', error));
      };
    return (
<div className="container mt-5">
      <h1 className="mb-4">Lista de Clientes</h1>
      {clientes.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Apellidos</th>
              <th>Ciudad</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Ocupación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.numeroDocumento}>
                <td>{cliente.nombre}</td>
                <td>{cliente.numeroDocumento}</td>
                <td>{cliente.apellidos}</td>
                <td>{cliente.ciudad.nombre}</td>
                <td>{cliente.correo_electronico}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.ocupacion.tipo}</td>
                <td>{cliente.estado}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(cliente)}                  >
                    Modificar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(cliente.numeroDocumento)}
                     >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay clientes disponibles.</p>
      )}
      {selectedCliente && (
        <ClientForm
          cliente={selectedCliente}
          onSave={handleSave}
          onCancel={() => setSelectedCliente(null)}
        />
      )}
    </div>
  );
};
export default List;
