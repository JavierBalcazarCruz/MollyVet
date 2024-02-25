import { useEffect } from 'react';
import '../assets/login/styles/style.css'; // Importa los estilos CSS
import setupLogin from '../assets/login/scripts/app'; // Importa el script JavaScript
import logImg from '../assets/login/images/log.png';
import regImg from '../assets/login/images/log.png';
export const Login = () => {

    useEffect(() => {
        setupLogin(); 
    }, []);

 return(
    <>
    <div className="container">
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

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Eres nuevo?</h3>
            <p>
            No te quedes atrás en la gestión de tu clínica veterinaria. <br></br>Regístrate y forma parte de nuestra plataforma. <h1>MollyVet</h1>
            </p>
            <button className="btn transparent" id="sign-up-btn">
           Regístrate
            </button>
          </div>
          <img src={regImg} alt="2 mascotas invitandote a registrar" className="image" />          
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>¿Ya tienes cuenta?</h3>
            <p>
                Inicia sesión y comienza a administrar tus veterinaria
            </p>
            <button className="btn transparent" id="sign-in-btn">
             Iniciar sesión
            </button>
          </div>
          <img src={logImg} className="image" alt="" />        
        </div>
      </div>
    </div>
    
    </>
 );
}
export default Login;