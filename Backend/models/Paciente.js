import mongoose from 'mongoose';

// Crear el esquema
const pacientesSchema = mongoose.Schema({
    nombreMascota: {
        type: String,
        required: true,
        trim: true
    },
    propietario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefonoCasa: {
        type: String,
        required: false
    },
    codigoPostal: {
        type: String,
        required: false
    },
    fecha: {
        type: Date,
        required: true,
        default:Date.now()
    },
    color: {
        type: String,
        required: false
    },
    colonia: {
        type: String,
        required: false
    },
    raza: {
        type: String,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    especie: {
        type: String,
        required: true
      },
      estado: {
        type: String,
        required: true
      },
    edad: {
        type: Number,
        required: true
    },
    consentimiento: {
        type: Boolean,
        required: true
      },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario', // Referencia al modelo de veterinario
        required: true
    }
},{
    timestams:true,
});

// Registrar el modelo
const Paciente = mongoose.model('Paciente', pacientesSchema);

export default Paciente;
