import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import "../assets/EditarPerfilDoc/styles/style.css";

const EditarPerfilDoc = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState(auth);
  const [editando, setEditando] = useState({});
  const [hayCambios, setHayCambios] = useState(false);

  const toggleEditar = (campo) => {
    setEditando(prev => {
      const newEditando = { ...prev, [campo]: !prev[campo] };
      const hayAlgunCampoEditando = Object.values(newEditando).some(value => value);
      setHayCambios(hayAlgunCampoEditando);
      return newEditando;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prev => ({ ...prev, [name]: value }));
    setHayCambios(true);
  };

  const handleGuardarTodo = async () => {
    try {
      await actualizarPerfil(perfil);
      setEditando({});
      setHayCambios(false);
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
    }
  };

  const handleCancelarTodo = () => {
    setPerfil(auth);
    setEditando({});
    setHayCambios(false);
  };

  const campos = [
    { nombre: 'nombre', label: 'Nombre', tipo: 'text' },
    { nombre: 'email', label: 'Email', tipo: 'email' },
    { nombre: 'telefono', label: 'Teléfono', tipo: 'tel' },
    { nombre: 'web', label: 'Sitio Web', tipo: 'url' },
  ];

  return (
    <div className="perfil-veterinario-container">
      <div className="perfil-card">
        <h1>Perfil del Veterinario</h1>
        <div className="avatar">
          <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${perfil.nombre}`} alt="Avatar" />
        </div>
        {campos.map(campo => (
          <div key={campo.nombre} className="campo-perfil">
            <label>{campo.label}</label>
            <div className={`campo-valor ${editando[campo.nombre] ? 'campo-edicion' : ''}`}>
              {editando[campo.nombre] ? (
                <input
                  type={campo.tipo}
                  name={campo.nombre}
                  value={perfil[campo.nombre] || ''}
                  onChange={handleChange}
                  className="input-edicion"
                />
              ) : (
                <span>{perfil[campo.nombre] || 'No especificado'}</span>
              )}
              <button onClick={() => toggleEditar(campo.nombre)} className="btn-editar">
                <Edit2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {hayCambios && (
          <div className="botones-accion">
            <button onClick={handleGuardarTodo} className="btn-guardar">
              Guardar
            </button>
            <button onClick={handleCancelarTodo} className="btn-cancelar">
              Cancelar 
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditarPerfilDoc;