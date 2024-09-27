import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, User, Plus, Stethoscope, PawPrint, Calendar, Weight, Heart, UserCheck,Edit  } from 'lucide-react';
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
      if (!document.querySelector('.contacts-list').contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    closeEditModal();
  };

  const EditModal = ({ type }) => {
    return (
      <div className={`edit-modal ${isEditModalOpen && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>

        <div className="modal-content">
          <h2>Editar {type === 'owner' ? 'Información del Dueño' : 'Información de la Mascota'}</h2>
          <form onSubmit={handleSubmit}>
            {type === 'owner' ? (
              <>
                <div className="input-group">
                  <User size={20} />
                  <input type="text" placeholder="Nombre del dueño" defaultValue={selectedContact.propietario} />
                </div>
                <div className="input-group">
                  <Phone size={20} />
                  <input type="tel" placeholder="Celular" defaultValue={selectedContact.celular} />
                </div>
                <div className="input-group">
                  <Phone size={20} />
                  <input type="tel" placeholder="Teléfono de casa" defaultValue={selectedContact.telefonoCasa} />
                </div>
                <div className="input-group">
                  <Mail size={20} />
                  <input type="email" placeholder="Email" defaultValue={selectedContact.email} />
                </div>
                <div className="input-group">
                  <MapPin size={20} />
                  <input type="text" placeholder="Dirección" defaultValue={selectedContact.direccion} />
                </div>
              </>
            ) : (
              <>
                <div className="input-group">
                  <PawPrint size={20} />
                  <input type="text" placeholder="Nombre de la mascota" defaultValue={selectedContact.nombreMascota} />
                </div>
                <div className="input-group">
                  <Stethoscope size={20} />
                  <input type="text" placeholder="Especie" defaultValue={selectedContact.especie} />
                </div>
                <div className="input-group">
                  <Calendar size={20} />
                  <input type="date" placeholder="Fecha de nacimiento" defaultValue={selectedContact.fecha} />
                </div>
                <div className="input-group">
                  <PawPrint size={20} />
                  <input type="text" placeholder="Raza" defaultValue={selectedContact.raza} />
                </div>
                <div className="input-group">
                  <PawPrint size={20} />
                  <input type="text" placeholder="Color" defaultValue={selectedContact.color} />
                </div>
                <div className="input-group">
                  <Calendar size={20} />
                  <input type="number" placeholder="Edad" defaultValue={selectedContact.edad} />
                </div>
                <div className="input-group">
                  <Weight size={20} />
                  <input type="number" placeholder="Peso" defaultValue={selectedContact.peso} />
                </div>
              </>
            )}
            <div className="modal-actions">
              <button type="button" onClick={closeEditModal}>Cancelar</button>
              <button type="submit" onClick={closeEditModal}>Guardar</button>
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
                  <Heart size={20} />
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
              </div>  <br />
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