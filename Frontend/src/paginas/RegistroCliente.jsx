import '../assets/registrarPaciente/styles/style.css';
import { useState } from 'react';
import logo from '../assets/registrarPaciente/images/logo.png';
import Swal from 'sweetalert2';
import cVacios from '../assets/registrarPaciente/images/CamposVacios.png';
import usePacientes from '../hooks/usePacientes';

const RegistroCliente = () => {
  const [active, setActive] = useState(1);
  const steps = 3;

  const nextStep = () => {
    setActive(prev => (prev < steps ? prev + 1 : steps));
  };

  const prevStep = () => {
    setActive(prev => (prev > 1 ? prev - 1 : 1));
  };

  const [nombreMascota, setNombreMascota] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cPostal, setcPostal] = useState('');
  const [colonia, setColonia] = useState('');
  const [telefonoCasa, setTelefonoCasa] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [vacunas, setVacunas] = useState('');
  const [operado, setOperado] = useState('');
  const [estado, setEstado] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);


//Lo que retorna el provider es un objeto , y guardarPaciente se tiene disponible en el provider
  const {guardarPaciente } = usePacientes();


  const mostrarAlerta = (titulo,texto,rutaImg,altImg) =>{
    Swal.fire({
      title: titulo,
      text: texto,
      imageUrl: rutaImg,        
      imageAlt: altImg
    });
  }
    //Validacion donde todos los campos son obligatorios para el registro del cliente
  const handleSubmit = async e =>{
    e.preventDefault();
   
    if([nombreMascota, propietario, email,celular,direccion,cPostal,colonia,telefonoCasa,raza, fechaNacimiento, edad, color,peso,especie,sexo,operado,vacunas,consentimiento,estado].includes('')){
      mostrarAlerta("⚠️ Los campos se encuentran vacios ⚠️","Alguno de los campos se encuentran vacios revisa la información que  ingresaste.",cVacios,"Gato observandote por que estan vacios los campos");
      return;
    }
    
    //Pasamos como objeto de tipo paciente y pasamos todo el arreglo
    guardarPaciente({ nombreMascota, propietario, email, direccion,colonia,telefonoCasa,raza, cPostal,especie, celular,edad, fechaNacimiento,peso,color,sexo,operado,vacunas,estado,consentimiento})

  }

  const handleConsentimientoChange = (e) => {
    setConsentimiento(e.target.checked);
  };

  return (
    <div className="background-page">
      <div className="registro-cliente">
        <div className="contenedor">
          <div className="form-box glassmorphism">
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
            <form onSubmit={handleSubmit}>
              <div className={`form-one form-step  ${active === 1 ? 'active' : 'form-step-hidden'}`}>
                <div className="bg-svg"></div>
                <h2 className='subtitulos'>Información del cliente</h2>
                <p>Ingrese la información personal del cliente</p>
                <div>
                  <label htmlFor='propietario'>Nombre del propietario</label>
                  <input id='propietario' type="text" className="form-input" placeholder="Escribe tu nombre completo" value={propietario} onChange={e=> setPropietario(e.target.value)} required />
                </div>
                <div>
                  <label>Domicilio</label>
                  <input type="text" className="form-input" placeholder="Escribe tu dirección" value={direccion} onChange={e=> setDireccion(e.target.value)} required />
                </div>
                <div>
                  <label>Estado</label>
                  <select name="estado" className="form-input select-color-text" value={estado} onChange={e=> setEstado(e.target.value)} required>
                    <option value="">Selecciona el estado</option>
                    <option value="Aguascalientes">Aguascalientes</option>
                    <option value="Baja California">Baja California</option>
                    <option value="Baja California Sur">Baja California Sur</option>
                    <option value="Campeche">Campeche</option>
                    <option value="Chiapas">Chiapas</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Ciudad de México">Ciudad de México</option>
                    <option value="Coahuila">Coahuila</option>
                    <option value="Colima">Colima</option>
                    <option value="Durango">Durango</option>
                    <option value="Estado de México">Estado de México</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Hidalgo">Hidalgo</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="Michoacán">Michoacán</option>
                    <option value="Morelos">Morelos</option>
                    <option value="Nayarit">Nayarit</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Oaxaca">Oaxaca</option>
                    <option value="Puebla">Puebla</option>
                    <option value="Querétaro">Querétaro</option>
                    <option value="Quintana Roo">Quintana Roo</option>
                    <option value="San Luis Potosí">San Luis Potosí</option>
                    <option value="Sinaloa">Sinaloa</option>
                    <option value="Sonora">Sonora</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Tamaulipas">Tamaulipas</option>
                    <option value="Tlaxcala">Tlaxcala</option>
                    <option value="Veracruz">Veracruz</option>
                    <option value="Yucatán">Yucatán</option>
                    <option value="Zacatecas">Zacatecas</option>
                  </select>
                </div>
                <div>
                  <label>Codigo Postal</label>
                  <input type="text" className="form-input" placeholder="Escribe tu código postal"  value={cPostal} onChange={e=> setcPostal(e.target.value)} required />
                </div>
                <div>
                   <label>Colonia</label>
                  <input type="text" className="form-input" placeholder="Escribe tu colonia"  value={colonia} onChange={e=> setColonia(e.target.value)} />
                </div>
              </div>
              <div className={`form-two form-step  ${active === 2 ? 'active' : 'form-step-hidden'}`}>
                <div className="bg-svg"></div>
                <h2 className='subtitulos'>Información del cliente</h2>
                <p>Ingrese la información personal del cliente</p>
                <div>
                  <label>Celular</label>
                  <input type="tel" className="form-input" placeholder="Escribe tu número de celular" value={celular} onChange={e=> setCelular(e.target.value)} required />
                </div>
                <div>
                  <label>Teléfono Casa</label>
                  <input type="tel" className="form-input" placeholder="Escribe tu número de teléfono de casa" value={telefonoCasa} onChange={e=> setTelefonoCasa(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor='email'>Correo electrónico</label>
                  <input id='email' type="email" className="form-input" placeholder="Escribe tu correo electrónico" value={email} onChange={e=> setEmail(e.target.value)} />
                </div>
              </div>
              <div className={`form-three form-step  ${active === 3 ? 'active' : 'form-step-hidden'}`}>
                <div className="bg-svg"></div>
                <h2 className='subtitulos'>Datos de la mascota</h2>
                <div>
                  <label htmlFor='mascota'>Nombre de la mascota</label>
                  <input id='mascota' type="text" className="form-input" placeholder="Escribe el nombre de tu mascota" value={nombreMascota} onChange={e=> setNombreMascota(e.target.value)} required />
                </div>
                <div>
                  <label>Especie </label>
                  <select name="especie" className="form-input select-color-text" value={especie} onChange={e=> setEspecie(e.target.value)} required>
                    <option value="">Selecciona la especie</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                   <label>Raza</label>
                  <input type="text" className="form-input" placeholder="Escribe la raza de tu mascota" value={raza} onChange={e=> setRaza(e.target.value)} required />
                </div>
                <div>
                 <label>Edad</label>
                  <input type="number" className="form-input" value={edad} onChange={e=> setEdad(e.target.value)} placeholder="Escribe edad de tu mascota" /> 
                
                  
                </div>
                <div>
                  <label>Sexo</label>
                  <select name="sexo" className="form-input select-color-text" value={sexo} onChange={e=> setSexo(e.target.value)} required>
                    <option value="">Selecciona el sexo</option>
                    <option value="hembra">Hembra</option>
                    <option value="macho">Macho</option>
                  </select>
                </div>
                <div>
                   <label>Color</label>
                  <input type="text" className="form-input" value={color} onChange={e=> setColor(e.target.value)} placeholder="Escribe el color de tu mascota" />
                </div>
                <div>
                  <label>Peso en Kg.</label>
                  <input type="number" className="form-input" placeholder="Escribe el peso de tu mascota" value={peso} onChange={e=> setPeso(e.target.value)}  step="0.01" required />
                </div>
                <div className="birth">
                  <label htmlFor='fechaNacimiento'>Fecha de nacimiento</label>
                  <input id='fechaNacimiento' type='date' className="form-input" value={fechaNacimiento} onChange={e=> setFechaNacimiento(e.target.value)}/>
                  {/* <div className="grouping">
                    <input type="text" className="form-input" pattern="[0-9]*" name="day" placeholder="DD" />
                    <input type="text" className="form-input" pattern="[0-9]*" name="month" placeholder="MM" />
                    <input type="text" className="form-input" pattern="[0-9]*" name="year" placeholder="YYYY" />
                  </div> */}
                </div>
               
                <div>
                  <label>¿Cuenta con todas las vacunas?</label>
                  <select name="vacunas" value={vacunas} onChange={e=> setVacunas(e.target.value)} className="form-input select-color-text" required>
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label>¿Ha sido operado?</label>
                  <select name="operado" className="form-input select-color-text" value={operado} onChange={e=> setOperado(e.target.value)} required>
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="checkbox">
                  <input type="checkbox" id="consentimiento"  checked={consentimiento}
                  onChange={handleConsentimientoChange} required />
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
                  <button type="submit" className="btn-submit">Registrar paciente</button>
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
