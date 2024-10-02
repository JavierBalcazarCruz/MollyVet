import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, User, Plus, Stethoscope, PawPrint, Calendar, Weight, Heart, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../assets/datosPacientes/styles/style.css";
import '../assets/homeScreen/styles/style.css';
import usePacientes from "../hooks/usePacientes";

const DatosPacientes = () => {
  const { pacientes } = usePacientes();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    setContacts(pacientes);
  }, [pacientes]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    const handleClickOutside = (event) => {
      if (selectedContact && isMenuOpen && !document.querySelector('.contacts-list').contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, selectedContact]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const selectContact = (contact) => {
    setSelectedContact(contact);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.nombreMascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.propietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.raza.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  
  const openEditModal = (type) => {
    setEditingType(type);
    setIsEditModalOpen(true);
    setIsClosing(false);
  };

  const closeEditModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsEditModalOpen(false);
      setEditingType(null);
      setIsClosing(false);
    }, 500); // Duración de la animación de cierre
  };

  const handleSubmit = (e, updatedData) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios, por ejemplo:
    // actualizarContacto(selectedContact._id, updatedData);
    console.log('Datos actualizados:', updatedData);
    closeEditModal();
  };

  // Arreglo con todos los estados de la República Mexicana
  const mexicanStates = [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Ciudad de México',
    'Coahuila',
    'Colima',
    'Durango',
    'Estado de México',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas',
];


  const EditModal = ({ type }) => {
    const [formData, setFormData] = useState({
      propietario: '',
      celular: '',
      telefonoCasa: '',
      email: '',
      direccion: '',
      colonia: '',
      estado: '',
      nombreMascota: '',
      especie: '',
      fecha: '',
      raza: '',
      color: '',
      edad: '',
      peso: '',
    });

    useEffect(() => {
      if (selectedContact) {
        if (type === 'owner') {
          setFormData({
            propietario: selectedContact.propietario || '',
            celular: selectedContact.celular || '',
            telefonoCasa: selectedContact.telefonoCasa || '',
            email: selectedContact.email || '',
            direccion: selectedContact.direccion || '',
            colonia: selectedContact.colonia || '',
            estado: selectedContact.estado || '',
            // Mascota fields remain empty
            nombreMascota: '',
            especie: '',
            fecha: '',
            raza: '',
            color: '',
            edad: '',
            peso: '',
          });
        } else if (type === 'pet') {
          setFormData({
            // Owner fields remain empty
            propietario: '',
            celular: '',
            telefonoCasa: '',
            email: '',
            direccion: '',
            colonia: '',
            estado: '',
            nombreMascota: selectedContact.nombreMascota || '',
            especie: selectedContact.especie || '',
            fecha: selectedContact.fecha ? new Date(selectedContact.fecha).toISOString().split('T')[0] : '',
            raza: selectedContact.raza || '',
            color: selectedContact.color || '',
            edad: selectedContact.edad || '',
            peso: selectedContact.peso || '',
          });
        }
      }
    }, [type, selectedContact]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleFormSubmit = (e) => {
      const updatedData = { ...formData };
      handleSubmit(e, updatedData);
    };

    return (
      <div className={`edit-modal ${isEditModalOpen && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
        <div className="modal-content">
          <h2>Editar {type === 'owner' ? 'Información del Dueño' : 'Información de la Mascota'}</h2>
          <form onSubmit={handleFormSubmit}>
            {type === 'owner' ? (
              <>
                <div className="input-group">
                  <label htmlFor="propietario">Nombre del dueño</label>
                  <User size={20} />
                  <input
                    id="propietario"
                    name="propietario"
                    type="text"
                    placeholder="Dueño"
                    value={formData.propietario}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="celular">Celular</label>
                  <Phone size={20} />
                  <input
                    id="celular"
                    name="celular"
                    type="tel"
                    placeholder="Celular"
                    value={formData.celular}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="telefonoCasa">Teléfono de casa</label>
                  <Phone size={20} />
                  <input
                    id="telefonoCasa"
                    name="telefonoCasa"
                    type="tel"
                    placeholder="Teléfono de casa"
                    value={formData.telefonoCasa}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <Mail size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="direccion">Domicilio</label>
                  <MapPin size={20} />
                  <input
                    id="direccion"
                    name="direccion"
                    type="text"
                    placeholder="Domicilio"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="colonia">Colonia</label>
                  <MapPin size={20} />
                  <input
                    id="colonia"
                    name="colonia"
                    type="text"
                    placeholder="Colonia"
                    value={formData.colonia}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="estado">Estado</label>
                  <MapPin size={20} />
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecciona un estado</option>
                    {mexicanStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="input-group">
                  <label htmlFor="nombreMascota">Mascota</label>
                  <PawPrint size={20} />
                  <input
                    id="nombreMascota"
                    name="nombreMascota"
                    type="text"
                    placeholder="Nombre de la mascota"
                    value={formData.nombreMascota}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="especie">Especie</label>
                  <Stethoscope size={20} />
                  <input
                    id="especie"
                    name="especie"
                    type="text"
                    placeholder="Especie"
                    value={formData.especie}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="fecha">Fecha de nacimiento</label>
                  <Calendar size={20} />
                  <input
                    id="fecha"
                    name="fecha"
                    type="date"
                    placeholder="Fecha de nacimiento"
                    value={formData.fecha}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="raza">Raza</label>
                  <PawPrint size={20} />
                  <input
                    id="raza"
                    name="raza"
                    type="text"
                    placeholder="Raza"
                    value={formData.raza}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="color">Color</label>
                  <PawPrint size={20} />
                  <input
                    id="color"
                    name="color"
                    type="text"
                    placeholder="Color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="edad">Edad</label>
                  <Calendar size={20} />
                  <input
                    id="edad"
                    name="edad"
                    type="number"
                    placeholder="Edad"
                    value={formData.edad}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="peso">Peso</label>
                  <Weight size={20} />
                  <input
                    id="peso"
                    name="peso"
                    type="number"
                    placeholder="Peso"
                    value={formData.peso}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </>
            )}
            <div className="modal-actions">
              <button type="button" onClick={closeEditModal}>Cancelar</button>
              <button type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`full-height-container background-cover ${isEditModalOpen ? 'blur-background' : ''}`}>
      <div className="veterinary-contacts">
        {isMobile && (
          <button className="menu-button" onClick={toggleMenu}>
            {isMenuOpen ? <X size={18} /> : <Menu size={24} />}
          </button>
        )}
        <div className={`contacts-list ${isMobile && isMenuOpen ? 'open' : ''}`}>
          <div className="contacts-header">
            <h2 className='titPacientes'>Pacientes</h2>
            <button className="add-contact" onClick={() => navigate('/admin/registro-cliente')}>
              <Plus size={24} />
            </button>
          </div>
          <input
            type="text"
            placeholder="Buscar paciente"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className={`contact-item ${selectedContact && selectedContact._id === contact._id ? 'selected' : ''}`}
              onClick={() => selectContact(contact)}
            >
              <div className="contact-avatar">
                {contact.especie.toLowerCase() === 'perro' ? (
                  <img src="https://pampermut.com/blog/wp-content/uploads/2020/05/Como-es-el-caracter-de-tu-perro-segun-su-horoscopo-scaled.jpg" alt="Perro Avatar" />
                ) : (
                  <img src="https://s1.elespanol.com/2020/05/18/como/gatos-mascotas-trucos_490961518_152142875_1706x960.jpg" alt="Cat Avatar" />
                )}
              </div>
              <div className="contact-info">
                <div className="contact-name">{contact.nombreMascota}</div>
                <div className="contact-species">{contact.especie} - {contact.raza}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`contact-details ${selectedContact ? 'open' : ''}`}>
          {selectedContact ? (
            <>
              <div className="contact-header">
                <div className="contact-avatar large">
                  <img
                    src={
                      selectedContact.especie.toLowerCase() === 'perro'
                        ? 'https://pampermut.com/blog/wp-content/uploads/2020/05/Como-es-el-caracter-de-tu-perro-segun-su-horoscopo-scaled.jpg'
                        : 'https://s1.elespanol.com/2020/05/18/como/gatos-mascotas-trucos_490961518_152142875_1706x960.jpg'
                    }
                    alt={selectedContact.especie}
                  />
                </div>
                <h2>{selectedContact.nombreMascota}</h2>
              </div>
              <div className="contact-info-details">
                <div className="widgets">
                  <div className="widget">
                    <div className="widget-header">
                      <h2 className='tit-datosPacientes'>Información del Dueño</h2>
                      <Edit size={20} className="edit-icon" onClick={() => openEditModal('owner')} />
                    </div>
                    <div className="info-item">
                      <User size={20} />
                      <span><strong>Dueño:</strong> {selectedContact.propietario}</span>
                    </div>
                    <div className="info-item">
                      <Phone size={20} />
                      <span><strong>Celular:</strong> {selectedContact.celular}</span>
                    </div>
                    <div className="info-item">
                      <Phone size={20} />
                      <span><strong>Teléfono de casa:</strong> {selectedContact.telefonoCasa}</span>
                    </div>
                    <div className="info-item">
                      <Mail size={20} />
                      <span><strong>Email:</strong> {selectedContact.email}</span>
                    </div>  
                    <div className="info-item">
                      <MapPin size={20} />
                      <span><strong>Dirección:</strong> {selectedContact.direccion}</span>         
                    </div>
                    <div className="info-item">
                      <MapPin size={20} />
                      <span><strong>Estado:</strong> {selectedContact.estado}</span>
                    </div>
                    <div className="info-item">
                      <MapPin size={20} />
                      <span><strong>Colonia:</strong> {selectedContact.colonia}</span>
                    </div>    
                    <br />                   
                  </div>
                  <div className="widget">
                    <div className="widget-header">
                      <h2 className='tit-datosPacientes'>Información de la mascota</h2>
                      <Edit size={20} className="edit-icon" onClick={() => openEditModal('pet')} />
                    </div>
                    <div className="info-item">
                      <PawPrint size={20} />
                      <span><strong>Nombre:</strong> {selectedContact.nombreMascota}</span>
                    </div>
                    <div className="info-item">
                      <Stethoscope size={20} />
                      <span><strong>Especie:</strong> {selectedContact.especie}</span>
                    </div>
                    <div className="info-item">
                      <Calendar size={20} />
                      <span><strong>Fecha de nacimiento:</strong> {new Date(selectedContact.fecha).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                      <PawPrint size={20} />
                      <span><strong>Raza:</strong> {selectedContact.raza}</span>
                    </div>
                    <div className="info-item">
                      <PawPrint size={20} />
                      <span><strong>Color:</strong> {selectedContact.color}</span>
                    </div>
                    <div className="info-item">
                      <Calendar size={20} />
                      <span><strong>Edad:</strong> {selectedContact.edad} años</span>
                    </div>
                    <div className="info-item">
                      <Weight size={20} />
                      <span><strong>Peso:</strong> {selectedContact.peso} kg</span>
                    </div>  
                    <br />
                  </div>
                  <div className="widget">
                    <h2 className='tit-datosPacientes'>Información reciente de la mascota</h2>
                  </div>        
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              { pacientes.length ? 
                (
                  <>
                    <h2>Listado de pacientes</h2>
                    <p className='tit-datosPacientes'>Administra tus pacientes </p>
                  </>
                ):
                (
                  <>
                    <h2>No hay pacientes</h2>
                    <p>Comienza agregando pacientes y aparecerán en este lugar</p>
                  </>
                )
              }
            </div>
          )}
        </div>
      </div>
      {isEditModalOpen && <EditModal type={editingType} />}
    </div>
  );
};

export default DatosPacientes;
