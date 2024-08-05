import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const List = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

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
        fetch(`http://localhost:8080/api/clientes/eliminar/${numeroDocumento}`, {
            method: 'DELETE',
        })
            .then(() => {
                setClientes(clientes.filter(cliente => cliente.numeroDocumento !== numeroDocumento));
            })
            .catch((error) => console.error('Error deleting cliente:', error));
    };

    const handleSave = () => {
        if (!selectedCliente) return;

        fetch(`http://localhost:8080/api/clientes/upgrade/${selectedCliente.numeroDocumento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedCliente),
        })
            .then((response) => response.json())
            .then((updatedCliente) => {
                setClientes(clientes.map(c =>
                    c.numeroDocumento === updatedCliente.numeroDocumento ? updatedCliente : c
                ));
                handleClose(); // Cierra el modal después de guardar
            })
            .catch((error) => console.error('Error updating cliente:', error));
    };
    const handleFormSubmit = (cliente) => {
      if (isEditing) {
          handleSave(cliente);
      } else {
      }
  };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedCliente(prev => ({
            ...prev,
            [name]: value
        }));
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
                                <td>{cliente.correoElectronico}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.ocupacion.tipo}</td>
                                <td>{cliente.estado}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(cliente)}
                                    >
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

            {showModal && selectedCliente && (
                <div className="modal fade show" style={{ display: 'block' }} onClick={() => setShowModal(false)}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modificar Cliente</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombre"
                                            value={selectedCliente.nombre || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Apellidos</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="apellidos"
                                            value={selectedCliente.apellidos || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="correoElectronico"
                                            value={selectedCliente.correoElectronico || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Teléfono</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="telefono"
                                            value={selectedCliente.telefono || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Estado</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="estado"
                                            value={selectedCliente.estado || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSave}
                                    >
                                        Guardar
                                    </button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )}
        <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => {
                                    navigate('/'); // Redirige al formulario inicial
                                    setShowModal(false); // Cierra el modal
                                }}>
                                    Volver al Formulario Inicial
                                </button>
                            </div>
        </div>
    );
};

export default List;
