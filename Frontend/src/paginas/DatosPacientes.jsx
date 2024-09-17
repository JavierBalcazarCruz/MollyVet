import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, User, Plus, Stethoscope, PawPrint, Calendar, Weight, Heart, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../assets/datosPacientes/styles/style.css";

const DatosPacientes = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Max',
      owner: 'John Doe',
      email: 'johndoe@gmail.com',
      celular: '123-456-7890',
      direccion: '123 Pet Street, Animalia 12345',
      telefonoCasa: '098-765-4321',
      codigoPostal: '12345',
      fecha: '2022-01-01',
      color: 'Golden',
      colonia: 'Animal Town',
      breed: 'Golden Retriever',
      weight: 30,
      species: 'Dog',
      estado: 'Healthy',
      age: 5,
      consentimiento: true,
      veterinario: 'Dr. Vet'
    },
    {
      id: 2,
      name: 'Whiskers',
      owner: 'Jane Smith',
      email: 'janesmith@gmail.com',
      celular: '234-567-8901',
      direccion: '456 Cat Lane, Feline City 67890',
      telefonoCasa: '123-456-7890',
      codigoPostal: '67890',
      fecha: '2021-05-15',
      color: 'White and Brown',
      colonia: 'Feline Town',
      breed: 'Siamese',
      weight: 4,
      species: 'Cat',
      estado: 'Healthy',
      age: 3,
      consentimiento: true,
      veterinario: 'Dr. Cat'
    },
    {
      id: 3,
      name: 'Buddy',
      owner: 'Mike Johnson',
      email: 'mikejohnson@gmail.com',
      celular: '345-678-9012',
      direccion: '789 Dog Avenue, Canine City 34567',
      telefonoCasa: '234-567-8901',
      codigoPostal: '34567',
      fecha: '2020-08-20',
      color: 'Black',
      colonia: 'Canine Town',
      breed: 'Labrador',
      weight: 35,
      species: 'Dog',
      estado: 'Healthy',
      age: 7,
      consentimiento: true,
      veterinario: 'Dr. Dog'
    },
    {
      id: 4,
      name: 'Luna',
      owner: 'Emily Davis',
      email: 'emilydavis@gmail.com',
      celular: '456-789-0123',
      direccion: '101 Cat Street, Feline City 45678',
      telefonoCasa: '345-678-9012',
      codigoPostal: '45678',
      fecha: '2019-11-11',
      color: 'Gray',
      colonia: 'Feline Town',
      breed: 'Persian',
      weight: 5,
      species: 'Cat',
      estado: 'Healthy',
      age: 4,
      consentimiento: true,
      veterinario: 'Dr. Cat'
    },
    {
      id: 5,
      name: 'Rocky',
      owner: 'Chris Wilson',
      email: 'chriswilson@gmail.com',
      celular: '567-890-1234',
      direccion: '202 Dog Lane, Canine City 56789',
      telefonoCasa: '456-789-0123',
      codigoPostal: '56789',
      fecha: '2018-03-22',
      color: 'Brown and Black',
      colonia: 'Canine Town',
      breed: 'German Shepherd',
      weight: 40,
      species: 'Dog',
      estado: 'Healthy',
      age: 6,
      consentimiento: true,
      veterinario: 'Dr. Dog'
    },
    {
      id: 6,
      name: 'Milo',
      owner: 'Sarah Thompson',
      email: 'sarahthompson@gmail.com',
      celular: '678-901-2345',
      direccion: '303 Cat Avenue, Feline City 67890',
      telefonoCasa: '567-890-1234',
      codigoPostal: '67890',
      fecha: '2021-07-07',
      color: 'Orange',
      colonia: 'Feline Town',
      breed: 'Maine Coon',
      weight: 6,
      species: 'Cat',
      estado: 'Healthy',
      age: 2,
      consentimiento: true,
      veterinario: 'Dr. Cat'
    },
    {
      id: 7,
      name: 'Charlie',
      owner: 'Alex Rodriguez',
      email: 'alexrodriguez@gmail.com',
      celular: '789-012-3456',
      direccion: '404 Dog Street, Canine City 78901',
      telefonoCasa: '678-901-2345',
      codigoPostal: '78901',
      fecha: '2017-09-09',
      color: 'Tricolor',
      colonia: 'Canine Town',
      breed: 'Beagle',
      weight: 10,
      species: 'Dog',
      estado: 'Healthy',
      age: 4,
      consentimiento: true,
      veterinario: 'Dr. Dog'
    },
    {
      id: 8,
      name: 'Simba',
      owner: 'Lisa Brown',
      email: 'lisabrown@gmail.com',
      celular: '890-123-4567',
      direccion: '505 Cat Lane, Feline City 89012',
      telefonoCasa: '789-012-3456',
      codigoPostal: '89012',
      fecha: '2016-12-12',
      color: 'Spotted',
      colonia: 'Feline Town',
      breed: 'Bengal',
      weight: 7,
      species: 'Cat',
      estado: 'Healthy',
      age: 5,
      consentimiento: true,
      veterinario: 'Dr. Cat'
    },
    {
      id: 9,
      name: 'Lucy',
      owner: 'David Miller',
      email: 'davidmiller@gmail.com',
      celular: '901-234-5678',
      direccion: '606 Dog Avenue, Canine City 90123',
      telefonoCasa: '890-123-4567',
      codigoPostal: '90123',
      fecha: '2015-04-04',
      color: 'White',
      colonia: 'Canine Town',
      breed: 'Poodle',
      weight: 8,
      species: 'Dog',
      estado: 'Healthy',
      age: 8,
      consentimiento: true,
      veterinario: 'Dr. Dog'
    },
    {
      id: 10,
      name: 'Oliver',
      owner: 'Emma Wilson',
      email: 'emmawilson@gmail.com',
      celular: '012-345-6789',
      direccion: '707 Cat Street, Feline City 01234',
      telefonoCasa: '901-234-5678',
      codigoPostal: '01234',
      fecha: '2020-02-02',
      color: 'Blue',
      colonia: 'Feline Town',
      breed: 'British Shorthair',
      weight: 5,
      species: 'Cat',
      estado: 'Healthy',
      age: 3,
      consentimiento: true,
      veterinario: 'Dr. Cat'
    },
    {
      id: 11,
      name: 'Bella',
      owner: 'James Lee',
      email: 'jameslee@gmail.com',
      celular: '123-456-7890',
      direccion: '808 Dog Lane, Canine City 12345',
      telefonoCasa: '012-345-6789',
      codigoPostal: '12345',
      fecha: '2019-06-06',
      color: 'Fawn',
      colonia: 'Canine Town',
      breed: 'Pug',
      weight: 9,
      species: 'Dog',
      estado: 'Healthy',
      age: 6,
      consentimiento: true,
      veterinario: 'Dr. Dog'
    },
    {
      id: 12,
      name: 'Shadow',
      owner: 'Ava Taylor',
      email: 'avataylor@gmail.com',
      celular: '234-567-8901',
      direccion: '909 Cat Avenue, Feline City 23456',
      telefonoCasa: '123-456-7890',
      codigoPostal: '23456',
      fecha: '2018-10-10',
      color: 'Gray',
      colonia: 'Feline Town',
      breed: 'Russian Blue',
      weight: 4,
      species: 'Cat',
      estado: 'Healthy',
      age: 5,
      consentimiento: true,
      veterinario: 'Dr. Cat'
    }
  ]);
  

  const [selectedContact, setSelectedContact] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
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
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="full-height-container background-cover">
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
              key={contact.id}
              className={`contact-item ${selectedContact && selectedContact.id === contact.id ? 'selected' : ''}`}
              onClick={() => selectContact(contact)}
            >
              <div className="contact-avatar">
                {contact.species === 'Dog' ? (
                  <img src="https://pampermut.com/blog/wp-content/uploads/2020/05/Como-es-el-caracter-de-tu-perro-segun-su-horoscopo-scaled.jpg" alt="Dog Avatar" />
                ) : (
                  <img src="https://s1.elespanol.com/2020/05/18/como/gatos-mascotas-trucos_490961518_152142875_1706x960.jpg" alt="Cat Avatar" />
                )}
              </div>
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-species">{contact.species} - {contact.breed}</div>
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
                      selectedContact.species === 'Dog'
                        ? 'https://pampermut.com/blog/wp-content/uploads/2020/05/Como-es-el-caracter-de-tu-perro-segun-su-horoscopo-scaled.jpg'
                        : 'https://s1.elespanol.com/2020/05/18/como/gatos-mascotas-trucos_490961518_152142875_1706x960.jpg'
                    }
                    alt={selectedContact.species}
                  />
                </div>
                <h2>{selectedContact.name}</h2>
              </div>
              <div className="contact-info-details">
  <div className="info-item">
    <User size={20} />
    <span><strong>Dueño:</strong> {selectedContact.owner}</span>
  </div>
  <div className="info-item">
    <Phone size={20} />
    <span><strong>Celular:</strong> {selectedContact.celular}</span>
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
    <PawPrint size={20} />
    <span><strong>Nombre:</strong> {selectedContact.name}</span>
  </div>
  <div className="info-item">
    <Stethoscope size={20} />
    <span><strong>Especie:</strong> {selectedContact.species}</span>
  </div>
  <div className="info-item">
    <PawPrint size={20} />
    <span><strong>Raza:</strong> {selectedContact.breed}</span>
  </div>
  <div className="info-item">
    <Calendar size={20} />
    <span><strong>Edad:</strong> {selectedContact.age} años</span>
  </div>
  <div className="info-item">
    <Weight size={20} />
    <span><strong>Peso:</strong> {selectedContact.weight} kg</span>
  </div>
  <div className="info-item">
    <Heart size={20} />
    <span><strong>Estado:</strong> {selectedContact.estado}</span>
  </div>
  <div className="info-item">
    <UserCheck size={20} />
    <span><strong>Veterinario:</strong> {selectedContact.veterinario}</span>
  </div>
</div>
            </>
          ) : (
            <div className="no-selection">
              <p>Selecciona un paciente para ver sus detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatosPacientes;
