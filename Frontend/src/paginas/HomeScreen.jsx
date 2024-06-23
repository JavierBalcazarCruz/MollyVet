import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

import logo from '../assets/homeScreen/images/logo.png';
import '../assets/homeScreen/styles/style.css';

import AppIcon from '../components/AppIcon';
import WidgetHoraActual from '../components/WidgetHoraActual';
import WidgetCitasProgramadas from '../components/WidgetCitasProgramadas';
import WidgetMetaDelMes from '../components/WidgetMetaDelMes';

const HomeScreen = () => {
  const { cerrarSesion } = useAuth();
  const [saludo, setSaludo] = useState('');
  
  useEffect(() => {
    // Agregar la clase al body cuando el componente se monte
    document.body.classList.add('home-screen-body');
    return () => {
      // Eliminar la clase del body cuando el componente se desmonte
      document.body.classList.remove('home-screen-body');
    };
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      setSaludo('Buenos días');
    } else if (currentHour >= 12 && currentHour < 19) {
      setSaludo('Buenas tardes');
    } else {
      setSaludo('Buenas noches');
    }
  }, []);

  return (
    <div className="contain">
      <header>
        <div className="logo-contain">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1>{saludo} Javier.</h1>
        <button className="logout-button" onClick={cerrarSesion}>Cerrar Sesión</button>
      </header>
      <div className="widgets">
        <WidgetHoraActual />
        <WidgetCitasProgramadas />
        <WidgetMetaDelMes />
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
