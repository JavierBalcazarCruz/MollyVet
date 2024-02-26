
import {Link} from 'react-router-dom';
import { useEffect,useState  } from 'react';
import '../assets/registrar/styles/style.css'; // Importa los estilos CSS
import logImg from '../assets/login/images/log.png';


const Registrar = () => {
  const [signUpMode, setSignUpMode] = useState(false);
  useEffect(() => {
    setSignUpMode(true);
}, [])
  return (
    <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
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
  )
}

export default Registrar