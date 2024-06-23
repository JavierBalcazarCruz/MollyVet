// HomeScreen.jsx
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

import logo from '../assets/homeScreen/images/logo.png';
import '../assets/homeScreen/styles/style.css';
import AppIcon from '../components/AppIcon';

const HomeScreen = () => {
  const { cerrarSesion } = useAuth();

  useEffect(() => {
     // Agregar la clase al body cuando el componente se monte
    document.body.classList.add('home-screen-body');
    return () => {
      // Eliminar la clase del body cuando el componente se desmonte
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
        <button className="logout-button" onClick={cerrarSesion}>Cerrar Sesión</button>
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
      <nav className="apps">
        <AppIcon to="/dashboard" color="#FFDD00" name="Dashboard" />
        <AppIcon to="/patients" color="#FFDD00" name="Pacientes" />
        <AppIcon to="/calendar" color="#3498DB" name="Calendario" />
        <AppIcon to="/inventory" color="#E74C3C" name="Inventario" />
        <AppIcon to="/directory" color="#F39C12" name="Directorio" />
        <AppIcon to="/bathrooms" color="#8E44AD" name="Baños" />
        <AppIcon to="/register-clients" color="#9B59B6" name="Registrar Clientes" />
        <AppIcon to="/recipe-generator" color="#1ABC9C" name="Generador de recetas" />
      </nav>
    </div>
  );
};

export default HomeScreen;
