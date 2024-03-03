import { Link,useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../assets/olvide-password/styles/style.css'; // Importa los estilos CSS
import logImg from '../assets/olvide-password/images/olvidar-password.svg';
export const OlvidePassword = () => {
  const navigate = useNavigate();
  const [signUpMode, setSignUpMode] = useState(false);

  useEffect(() => {
    setSignUpMode(true);
  }, []);

  const handleSignInClick = () => {
    // Evitar el comportamiento predeterminado del enlace
 
     setSignUpMode(false);
     setTimeout(() => {
       navigate('/'); // Navegar a la ruta principal sin refresh
     }, 1800); // Espera a que termine la animación antes de navegar   
   };

  return (
   <>
     <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">    
        <form action="#" className="sign-in-form">
              <h2 className="title">Inicia sesión</h2>
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
    


          <form action="#" className="sign-up-form">
            <h2 className="title">Recupera tu acceso</h2>          
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email de registro" />
            </div>
         
            <input type="submit" className="btn" value="Recuperar" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿No tienes una cuenta?</h3>
            <p>Regístrate y comienza a administrar tu veterinaria con </p>
            <h1>MollyVet</h1>
            <br />
            <Link to="index" className="btn transparent" id="sign-up-btn">
              Regístrate
            </Link>
          </div>
          <img src={logImg} alt="2 mascotas invitandote a registrar" className="image" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>¿Ya recordaste tu contraseña?</h3>
            <p>Inicia sesión y comienza a administrar tus veterinaria</p>
            <br></br>
            <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
              Iniciar sesión
            </button>
          </div>
          
          <img src={logImg} className="image" alt="" />
        </div>
      </div>
    </div>
   </>
  )
}

export default OlvidePassword;