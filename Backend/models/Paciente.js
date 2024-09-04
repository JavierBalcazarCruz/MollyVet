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
    fecha: {
        type: Date,
        required: true,
        default:Date.now()
    },
    sintomas: {
        type: String,
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
