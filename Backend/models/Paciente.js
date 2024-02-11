import mongoose from 'mongoose';

// Crear el esquema
const pacientesSchema = mongoose.Schema({
    nombre: {
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
    nombre: {
        type: String,
        required: true
    },    
    historialMedico: {
        type: String,
        default: null,
        trim: true
    },
    fechaRegistro: {
        type: Date,
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
