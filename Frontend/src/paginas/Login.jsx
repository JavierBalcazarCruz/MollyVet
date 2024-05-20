import {Link,useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect, useState  } from 'react';
import '../assets/login/styles/style.css'; // Importa los estilos CSS
import regImg from '../assets/login/images/log.svg';

const ScrollToTop = () => {
    const { pathname } = useLocation();  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);  
    return null;
  };
  
const Login = () => {
  const [signUpMode, setSignUpMode] = useState(false);
  useEffect(() => {  
  }, []);

  const handleSignUpClick = () => {
      setSignUpMode(true);
  };


  return(
  <>
  <ScrollToTop />
  <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
  {/* Inicio Formulario de inicio de sesión */}
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
        <nav className='olvide-password'>
          <Link to="/olvide-password" className="olvide-password-link" id="">Olvide mi password</Link>
        </nav>
        <form action="#" className="sign-up-form">
          <h2 className="title">Registrate</h2>           
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Contraseña" />
          </div>
          <input type="submit" className="btn" value="Enviar" />
        </form>
      </div>
    </div>
  {/* Fin Formulario de inicio de sesión */}

  <div className="panels-container">
    <div className="panel left-panel">
      <div className="content">
        <h3>¿No tienes una cuenta?</h3>
        <p>Regístrate y comienza a administrar tu veterinaria con </p>
        <h1 className='marca'>MollyVet</h1>            
        <Link to="/registrar" className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}> Regístrate</Link>
      </div>
      <img src={regImg} alt="2 mascotas invitandote a registrar" className="image" />          
    </div>

  </div>
  </div>

  </>
  );
}
export default Login;