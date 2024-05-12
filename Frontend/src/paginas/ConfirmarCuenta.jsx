import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import '../assets/confirmacion/styles/style.css'; // Importa los estilos CSS
import regImg from '../assets/confirmacion/images/registrar.svg';

const ConfirmarCuenta = () => {
  const navigate = useNavigate();
  const [signUpMode, setSignUpMode] = useState(false);

 

  const mostrarAlerta = (titulo, texto, rutaImg, altImg) => {
    Swal.fire({
      title: titulo,
      text: texto,
      imageUrl: rutaImg,
      imageAlt: altImg
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();


    // Ahora se creara el usuario en la base de datos con la api
    try {
      const url = 'http://localhost:4000/api/veterinarios';
      const respuesta = await axios.post(url, { nombre, email, password });
      console.log(respuesta);
      mostrarAlerta("Registrado correctamente", "Revisa tu email y confirma tu registro.", rExistoso, "Perrito sonriendo");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log('***');
      console.log('Error:', error.message);
      mostrarAlerta("Error al registrarse", error.response.data.msg, uRepetido, "GatoConPan");
    }
  }

  useEffect(() => {
    setSignUpMode(true);
  }, []);

  const handleSignInClick = () => {
    setSignUpMode(false);
    setTimeout(() => {
      navigate('/');
    }, 1800);
  };

  return (
    <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
          
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Contraseña" autoComplete="current-password" />
            </div>
            <input type="submit" value="Iniciar  Sesión" className="btn solid" />
          </form>
    
          <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Confirmando tu cuenta ahora... </h2>
          
            <h3 className="titleConfirm">¡Un momento, estamos preparando todo para ti!</h3>
            <h3 className="titleConfirm"> Tu experiencia única de administrar tu veterinario está a punto de comenzar. 💫 </h3>
       
           
          
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel"></div>
        <div className="panel right-panel">
          <div className="content">
          <h3>Cuenta confirmada bienvenido</h3>
            <p>Serás redirigido al inicio de sesión, espere un momento ...</p>
            
            <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
              Iniciar sesión
            </button>
          </div>
          <img src={regImg} className="image" alt="Imagen de confirmación" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCuenta;
