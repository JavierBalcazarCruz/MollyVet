// AppIcon.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AppIcon = ({ to, color, name }) => (
  <Link to={to} className="app">
    <div className="icon" style={{ backgroundColor: color }}></div>
    <h3>{name}</h3>
  </Link>
);

export default AppIcon;
