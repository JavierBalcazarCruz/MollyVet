import React, { useEffect } from 'react';
import logo from '../assets/homeScreen/images/logo.png';
import '../assets/homeScreen/styles/style.css';

const HomeScreen = () => {
  useEffect(() => {
    // Agregar la clase al body cuando el componente se monte
    document.body.classList.add('home-screen-body');

    // Eliminar la clase del body cuando el componente se desmonte
    return () => {
      document.body.classList.remove('home-screen-body');
    };
  }, []);

  return (
    <div className="contain">
      <header>
        <div className="logo-contain">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1>Buenas noches, Javier.</h1>
        <button className="logout-button">Cerrar Sesión</button>
      </header>
      <div className="widgets">
        <div className="widget">
          <h2>Hora Actual</h2>
          <div className="time-contain">
            <p id="time">9:03 PM</p>
          </div>
        </div>
        <div className="widget">
          <h2>Citas Programadas</h2>
          <p>Pendientes: 4 clientes</p>
          <p>Confirmadas: 10 clientes</p>
          <p>Canceladas: 2 clientes</p>
          <p>Pospuestas: 3 clientes</p>
        </div>
        <div className="widget">
          <h2>Meta del mes</h2>
          <p>50 Clientes / 100 clientes</p>
          <p>50% de la meta cumplida</p>
          <div className="progress-bar">
            <div className="progress" style={{ '--progress-width': '50%' }}></div>
          </div>
        </div>
      </div>
      <div className="apps">
        <div className="app">
          <div className="icon" style={{ backgroundColor: '#FFDD00' }}></div>
          <h3>Dashboard</h3>
        </div>
        <div className="app">
          <div className="icon" style={{ backgroundColor: '#FFDD00' }}></div>
          <h3>Pacientes</h3>
        </div>
        <div className="app">
          <div className="icon" style={{ backgroundColor: '#3498DB' }}></div>
          <h3>Calendario</h3>
        </div>
        <div className="app">
          <div className="icon" style={{ backgroundColor: '#E74C3C' }}></div>
          <h3>Inventario</h3>
        </div>
        <div className="app">
          <div className="icon" style={{ backgroundColor: '#F39C12' }}></div>
          <h3>Directorio</h3>
        </div>
        <div className="app">
          <div className="icon" style={{ backgroundColor: '#8E44AD' }}></div>
          <h3>Baños</h3>
        </div>
        <div className="app">
          <div className="icon" style={{ backgroundColor: '#9B59B6' }}></div>
          <h3>Registrar Clientes</h3>
        </div>
        <div className="app">
          <div className="icon" style={{ backgroundColor: '#1ABC9C' }}></div>
          <h3>Generador de recetas</h3>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
