
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import "../assets/confirmacion/styles/style.css"; // Importa los estilos CSS
import regImg from "../assets/confirmacion/images/registrar.svg";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
console.log('******');

  const [cuentaConfirmada,setCuentaConfirmada] = useState(false);
  const [cargando,setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [signUpMode, setSignUpMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();   
  };

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {      
            //Confirmación de usuario a la BD
            const url =  `http://localhost:4000/api/veterinarios/confirmar/${id}`;      
            const { data } = await axios(url);
            setCuentaConfirmada(true);
            setAlerta({
              msg:data.msg,
              error:false              
            });
            
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error:true
        });
      }
      setCargando(false);
    }
    setSignUpMode(true);
    confirmarCuenta();
    return () => {};
  }, [id]);

  const handleSignInClick = () => {
    setSignUpMode(false);
    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  return (
    <div className={`container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Confirmando tu cuenta ahora... </h2>

            <h3 className="titleConfirm">
              ¡Un momento, estamos preparando todo para ti!
            </h3>
            <h3 className="titleConfirm">
              {" "}
              Tu experiencia única de administrar tu veterinario está a punto de
              comenzar. 💫{" "}
            </h3>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel"></div>
        <div className="panel right-panel">
          <div className="content">
            {!cargando &&    <Alerta
              alerta = {alerta}
            />}
           
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleSignInClick}
            >
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
