import '../assets/registrarPaciente/styles/style.css';
import React, { useState } from 'react';
import logo from '../assets/homeScreen/images/logo.png';

const RegistroCliente = () => {
  const [active, setActive] = useState(1);
  const steps = 3;

  const nextStep = () => {
    setActive(prev => (prev < steps ? prev + 1 : steps));
  };

  const prevStep = () => {
    setActive(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="background-page">
      <div className="registro-cliente">
        <div className="contenedor">
          <div className="form-box">
            <div className="progreso glassmorphism">
              <div className="logo-registro">
                <a href="#">
                  <img src={logo} alt="Logo" className="logo-reg" /> {/* Reemplaza el texto con la imagen */}
                </a>
              </div>
              <ul className="progress-steps">
                <li className={`step ${active === 1 ? 'active' : ''}`}>
                  <span>1</span>
                  <p>Cliente <br /><span className='desc'>25 secs to complete</span></p>
                </li>
                <li className={`step ${active === 2 ? 'active' : ''}`}>
                  <span>2</span>
                  <p>Continuación <br /><span className='desc'>60 secs to complete</span></p>
                </li>
                <li className={`step ${active === 3 ? 'active' : ''}`}>
                  <span>3</span>
                  <p>Mascota <br /><span className='desc'>30 secs to complete</span></p>
                </li>
              </ul>
            </div>
            <form action="">
              <div className={`form-one form-step glassmorphism ${active === 1 ? 'active' : 'form-step-hidden'}`}>
                <div className="bg-svg"></div>
                <h2 className='subtitulos'>Información del cliente</h2>
                <p>Ingrese la información personal del cliente</p>
                <div>
                  <label>Nombre completo</label>
                  <input type="text" className="form-input" placeholder="Escribe tu nombre completo" required />
                </div>
                <div>
                  <label>Dirección</label>
                  <input type="text" className="form-input" placeholder="Escribe tu dirección" required />
                </div>
                <div>
                  <label>Estado</label>
                  <input type="text" className="form-input" placeholder="Escribe tu estado" required />
                </div>
                <div>
                  <label>CP</label>
                  <input type="text" className="form-input" placeholder="Escribe tu código postal" required />
                </div>
                <div>
                  <label>Colonia</label>
                  <input type="text" className="form-input" placeholder="Escribe tu colonia" required />
                </div>
                

             
              </div>
              <div className={`form-two form-step glassmorphism ${active === 2 ? 'active' : 'form-step-hidden'}`}>
              <div className="bg-svg"></div>
                <h2 className='subtitulos'>Información del cliente</h2>
                <p>Ingrese la información personal del cliente</p>
                <div>
                  <label>Celular</label>
                  <input type="tel" className="form-input" placeholder="Escribe tu número de celular" required />
                </div>
                <div>
                  <label>Teléfono Casa</label>
                  <input type="tel" className="form-input" placeholder="Escribe tu número de teléfono de casa" />
                </div>
                <div>
                  <label>Correo electrónico</label>
                  <input type="email" className="form-input" placeholder="Escribe tu correo electrónico" />
                </div>
              </div>
              <div className={`form-three form-step glassmorphism ${active === 3 ? 'active' : 'form-step-hidden'}`}>
                <div className="bg-svg"></div>
                <h2 className='subtitulos'>Datos de la mascota</h2>
              <div>
              <label>Nombre de la mascota</label>
              <input type="text" className="form-input" placeholder="Escribe el nombre de tu mascota" required />
            </div>
            <div>
            <label>Especie </label>
            <select name="especie" className="form-input" required>
              <option value="">Selecciona la especie</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>
            <div>
              <label>Raza</label>
              <input type="text" className="form-input" placeholder="Escribe la raza de tu mascota" required />
            </div>
            <div>
              <label>Edad</label>
              <input type="number" className="form-input" placeholder="Escribe la edad de tu mascota" />
            </div>
            <div>
              <label>Sexo</label>
              <select name="sexo" className="form-input" required>
                <option value="">Selecciona el sexo</option>
                <option value="hembra">Hembra</option>
                <option value="macho">Macho</option>
              </select>
            </div>
            <div>
              <label>Color</label>
              <input type="text" className="form-input" placeholder="Escribe el color de tu mascota" />
            </div>
            <div>
              <label>Peso</label>
              <input type="number" className="form-input" placeholder="Escribe el peso de tu mascota" step="0.01" required />
            </div>
            <div className="birth">
              <label>Fecha de nacimiento</label>
              <div className="grouping">
                <input type="text" className="form-input" pattern="[0-9]*" name="day" placeholder="DD" />
                <input type="text" className="form-input" pattern="[0-9]*" name="month" placeholder="MM" />
                <input type="text" className="form-input" pattern="[0-9]*" name="year" placeholder="YYYY" />
              </div>
            </div>
            <div>
              <label>¿Cuenta con todas las vacunas?</label>
              <select name="vacunas" className="form-input" required>
                <option value="">Selecciona una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label>¿Ha sido operado?</label>
              <select name="operado" className="form-input" required>
                <option value="">Selecciona una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="consentimiento" required />
              <label htmlFor="consentimiento">Estoy de acuerdo con la recopilación de información mía y de mi mascota</label>
            </div>

              </div>
              <div className="btn-group">
                  <button type="button" className="btn-prev" onClick={prevStep} disabled={active === 1}>Regresar</button>
                  
                  {/* Botón "Next" para los pasos 1 y 2 */}
                  {active < steps && (
                    <button type="button" className="btn-next" onClick={nextStep} disabled={active === steps}>
                      Siguiente
                    </button>
                  )}

                  {/* Botón "Enviar" para el paso 3 */}
                  {active === steps && (
                    <button type="button" className="btn-submit" onClick={() => alert('Form Submitted')}>Registrar</button>
                  )}
                </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;
